const express = require('express');
const bcrypt = require("bcrypt");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const {users, files, folders} = require('../models');
const UsersUpdateValidators= require('../validators/usersUpdate');
const multerConfig = require('../config/multerConfig');
const ToLowerCaseData = require('../helpers/ToLowerCaseHelper');
const {checkJwt} = require('../middlewares/jwtMiddleware');

const router = express.Router();

router.get('/get', checkJwt, async (req, res) => {
    const user = await users.findByPk(req.id); 

    if(user){ return res.status(200).json({user})} else { return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})};
})

router.put('/update', checkJwt, async(req, res) => {
    const saltRounds = 10;
    const newBody = await ToLowerCaseData(req.body);

    const {new_password, current_password} = req.body;
    const {new_email} = newBody;

    const {errors, isValid} = await UsersUpdateValidators(newBody);

    if(!isValid){ return res.status(400).json(errors) }

    if(new_email){
        const VerifyEmail = await users.findOne({where: { email: new_email }});
    
        if(VerifyEmail){
            errors.email = 'email already registered.';
             return res.status(400).json(errors); 
        }
    
        const updateUser = await users.update({email: new_email}, {where: {id: req.id}});
    
        if(updateUser){ return res.status(200).json({messageOK: "Profile updated."}, updateUser)} else { return res.status(500).json({serverError: 'The server encountered a situation that it does not know how to deal with.'})}
    }

    if(new_password){
        const database_password = await users.findByPk(req.id);
        
        const compared_Password = await bcrypt.compareSync(current_password, database_password.password);
    
        if(!compared_Password){
            errors.password = 'Current password must match.';
            return res.status(400).json(errors);
        }
    
        const hash = bcrypt.hashSync(new_password, saltRounds);

        const updateUser = await users.update({password: hash}, {where: {id: req.id}});

        if(updateUser){ return res.status(200).json({messageOK: "Profile updated."})} else { return res.status(500).json({serverError: 'The server encountered a situation that it does not know how to deal with.'})}
    }
});

router.delete('/delete', checkJwt, async (req, res) => {
    const errors = {};
    const unlinkAsync = promisify(fs.unlink)
    
    const getUser = await users.findByPk(req.id);

    const match = await bcrypt.compareSync(req.body.password, getUser.password);
    
    if(!match){
        errors.credentials = 'Incorrect credentials.';
        return res.status(400).json(errors);
    };

    const getFiles = await files.findOne({where: {usersId: req.id}});

    if(getFiles){
        errors.files = 'Files were found in your account. To delete your account you need to delete all files.'
        return res.status(401).json(errors);
    };

    const getFolders = await folders.findOne({where: {usersId: req.id}})

    if(getFolders){
        errors.files = 'Folders were found in your account. To delete your account you need to delete all folders.'
        return res.status(401).json(errors);
    };

    const deleting = await users.destroy({where: {id: req.id}});

    if(deleting){
        await unlinkAsync(getUser.pathProfile)
        await fs.rmdirSync(path.resolve(__dirname, '..', '..', 'temp', 'uploads', req.username));
        return res.status(200).json({messageOK: 'OK'});
    }

    return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."});
});
    
router.put('/photo', checkJwt, multer(multerConfig).single('file'), async(req, res) => {
    const current_user = await users.findByPk(req.id);
    const unlinkAsync = promisify(fs.unlink)
    const urlProfile = req.headers.host + '/files' + `/${req.username}/` + req.file.filename;

    if(current_user.pathProfile && current_user.urlProfile){ unlinkAsync(current_user.pathProfile);};
    
    const updateUser = await users.update({urlProfile, pathProfile: req.file.path}, {where: {id: req.id}});

    if(updateUser){ return res.status(200).json({messageOK: "Profile updated."})} else { return res.status(500).json({serverError: 'The server encountered a situation that it does not know how to deal with.'})}
});

module.exports = router;