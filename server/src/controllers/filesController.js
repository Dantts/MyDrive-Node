const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const Sequelize = require('sequelize');

const multerConfig = require('../config/multerConfig');
const ToLowerCaseData = require('../helpers/ToLowerCaseHelper');

const {files, users, folders} = require('../models');
const {checkJwt} = require('../middlewares/jwtMiddleware');

const router = express.Router();

router.get('/get/:id', checkJwt, async(req, res) => {
    const errors = {};
    const {id} = req.params;

    const getFolder = await folders.findOne({where: {id}})

    if(!getFolder){ return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})}

    if(getFolder.public === true){
        const getFiles = await files.findAll({where: {foldersId: getFolder.id}})

        if(!getFiles){return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})}

        return res.status(200).json(getFiles);
    }

    const getFiles = await files.findAll({where: {usersId: req.id, foldersId: getFolder.id}});

    if(getFiles.length === 0 && getFolder.public === false){
        errors.folders = "This folder is not public."
        return res.status(500).json(errors);
    }
    
    if(getFiles){
        if(getFiles.length === 0){
            errors.notFound = 'Files not found.'
            return res.status(404).json(errors);
        };
        return res.status(200).json(getFiles);
    };
    
    return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})
});

router.get('/search', checkJwt, async (req, res) => {
    const Op = Sequelize.Op;
    const errors = {};
    const newBody = await ToLowerCaseData(req.body);
    const getFiles = await files.findAll({where: {name: {[Op.like]: `%${newBody.search}%`}, usersId: req.id}});

    if(!getFiles){return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})};

    if(getFiles.length === 0){
        errors.notFound = 'Files not found.'
        return res.status(404).json(errors);
    };

    return res.status(200).json(getFiles);
});

router.post('/upload/:id', checkJwt, multer(multerConfig).single('file'), async (req, res) => {
    const unlinkAsync = promisify(fs.unlink);
    const noSpaceNumber = 0;
    const errors = {};
    const {id} = req.params;
    const current_user = await users.findByPk(req.id);
    const folder = await folders.findByPk(id);
    const {originalname: name, filename: keyName, size, path} = req.file;
    var public = false; 
    const url = req.headers.host + '/files' + `/${req.username}/` + req.file.filename;

    const haveStorage = await (parseInt(current_user.storageTotalSize) - parseInt(current_user.storageSize)) - parseInt(size);

    if(haveStorage <= noSpaceNumber){
        unlinkAsync(path)
        errors.storage = 'You dont have enough space.'
        return res.status(401).json(errors);
    }

    if(req.id !== folder.usersId){
        unlinkAsync(path)
        return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});
    }

    if(folder.public === true){
        public = true
    }

    const currentStorage = await (parseInt(current_user.storageSize) + parseInt(size));

    const filesCreated = await files.create({name, keyName, url, path, size, public, usersId: req.id, foldersId: id});

    if(filesCreated){
        const storageUpdated = await users.update({storageSize: currentStorage}, {where: {id: req.id}})

        if(storageUpdated){return res.status(200).json(filesCreated);};

        return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})
    }else{
        return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})
    }
});

router.put('/update/:id', checkJwt, async (req, res) => {
    console.log(req.id)
    const errors = {};
    const {id} = req.params;
    const {foldersId, public} = req.body;
    const file = await files.findByPk(id);
    const currentFolder = await folders.findByPk(file.foldersId);
    let newfolder;

    if(foldersId){
        newFolder = await folders.findByPk(foldersId);
        if(req.id !== newFolder.usersId || file.usersId !== newFolder.usersId){
            return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});
        }
    }
    

    if(req.id !== file.usersId){
        return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});
    }

    
    if(public !== undefined && foldersId !== undefined){
        if(newFolder.public === true && public === false){
            errors.folder = "You are not allowed to do this, because your file cannot be private in a public folder.";
            return res.status(401).json(errors);
        }

        const updatedFile = await files.update({public, foldersId}, {where: {usersId: req.id, id}});
        
        if(updatedFile){
            return res.status(200).json({messageOK: "OK"});
        }
        
        return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})
    }

    if(foldersId){
        if(newFolder.public === true){
            const updatedFile = await files.update({public: true, foldersId}, {where: {usersId: req.id, id}});

            if(updatedFile){ 
                if(newFolder.public === true && file.public === false){
                    return res.status(200).json({warning: "Your file has been changed to public, because the current folder for that file is public."});
                }else{
                    return res.status(200).json({messageOK: "OK"});
                }
            }

            return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})
        }

        const updatedFile = await files.update({foldersId}, {where: {usersId: req.id, id}});

        if(!updatedFile){ 
            return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})
        }

        if(file.public === true && newFolder.public === false){
            return res.status(200).json({warning: "Be careful, because you are moving to a non-public folder and your file is public."});
        }

        return res.status(200).json({messageOK: "OK"});
    }

    if(currentFolder.public === true && file.public === true){
        errors.folder = "You are not allowed to do this, because this folder is public.";
        return res.status(401).json(errors);
    }
    
    const updatedFile = await files.update({public}, {where: {usersId: req.id, id}});

    
    if(updatedFile){
        return res.status(200).json({messageOK: "OK"});
    }

    return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})
}); 

router.delete('/delete/:id', checkJwt, async (req, res) => {
    const {id} = req.params;
    const current_user = await users.findByPk(req.id);
    const unlinkAsync = promisify(fs.unlink);

    const getFile = await files.findByPk(id);
    const propertiesFile = fs.lstatSync(getFile.path);
    
    if(!getFile){return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})};
    
    
    const deleting = await files.destroy({where: {id, usersId: req.id}});
    
    if(deleting){
        const currentStorage = await parseInt(current_user.storageSize) - parseInt(propertiesFile.size);

        const storageUpdated = await users.update({storageSize: currentStorage}, {where: {id: req.id}})

        if(!storageUpdated){return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})}

        await unlinkAsync(getFile.path);

        return res.status(200).json({messageOK: 'file successfully deleted'});
    }else{
        return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});
    }
});

module.exports = router;