const express = require('express');
const Validator = require('validator');
const {folders, files} = require('../models');
const {checkJwt} = require('../middlewares/jwtMiddleware');

const router = express.Router();

router.get('/get', checkJwt, async (req, res) => {
    const errors = {};
    const folder = await folders.findAll({where: {usersId: req.id}});

    if(!folder){
        return res.status(404).json({serverError: "The server encountered a situation that it does not know how to deal with."});
    }

    if(folder.length === 0){
        errors.notFound = 'Folders not found.';
        return res.status(404).json(errors);
    }

    return res.status(200).json(folder);
});

router.post('/create', checkJwt, async (req, res) => {
    const {name, public} = req.body;
    const errors = {};

    if(Validator.isEmpty(name)){
        errors.name = 'Name field is required.'
        return res.status(401).json(errors);
    }

    const createFolder = await folders.create({name, public, usersId: req.id});

    if(!createFolder){ return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})};

    return res.status(200).json(createFolder);
});

router.put('/update/:id', checkJwt, async (req, res) => {
    const {id} = req.params;
    const {name, public} = req.body;
    const errors = {};
    const currentFolder = await folders.findByPk(id);

    if(currentFolder.usersId !== req.id){
        return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});
    }

    if(currentFolder.isMain === true){
        return res.status(500).json({warning: "You are not allowed to do this, because this is your main folder."});
    }

    if(name){
        if(Validator.isEmpty(name)){
            errors.name = 'Name field is required.'
            return res.status(401).json(errors);
        }
    }

    if((public === true || public === false) && name === undefined){
        const getFiles = await files.findAll({where: {usersId: req.id, foldersId: id}});

        if(getFiles){
            for (const file of getFiles) {
                const updatedFiles = await files.update({public}, {where: {id: file.id}})
                if(updatedFiles){continue;}
                errors.serverError = "The server encountered a situation that it does not know how to deal with."
            }

            if(errors.length === 0){return res.status(500).json(errors);}

            const updatedFolder = await folders.update({public}, {where: {usersId: req.id, id}});

            if(updatedFolder){return res.status(200).json({messageOK: "OK"})};

            return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});

        }else{
            const updatedFolder = await folders.update({public}, {where: {usersId: req.id, id}});

            if(updatedFolder){return res.status(200).json({messageOK: "OK"})};

            return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});
        }
    }

    const updatedFolder = await folders.update({name, public}, {where: {usersId: req.id, id}});

    if(updatedFolder){return res.status(200).json({messageOK: "OK"})};

    return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});
});

router.delete('/delete/:id', checkJwt, async (req, res) => {
    const {id} = req.params;
    const currentFolder = await folders.findByPk(id);
    const folderFiles = await files.findAll({where: {foldersId: id, usersId: req.id}});

    if(currentFolder.usersId !== req.id){
        return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});
    }

    if(currentFolder.isMain === true){
        return res.status(401).json({warning: "You are not allowed to do this, because this is your main folder."});
    }

    if(folderFiles.length > 0){
        return res.status(401).json({warning: "You are not allowed to do this, because this folder contains files"});
    }

    const deleting = await folders.destroy({where: {id}});

    if(!deleting){
        return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});
    }

    return res.status(200).json({messageOK: "OK"});
});

module.exports = router;