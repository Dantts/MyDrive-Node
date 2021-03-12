const express = require('express');
const bcrypt = require("bcrypt");
const fs = require('fs');
const validator = require('validator');

const {users, folders} = require('../models');
const UsersSignUpValidators = require('../validators/usersSign-up');
const UsersSignInValidators = require('../validators/userSign-in');
const ToLowerCaseData = require('../helpers/ToLowerCaseHelper');
const {generateJwt} = require('../helpers/JwtHelper');

const router = express.Router();

router.post('/sign-up', async (req, res) => {
    const saltRounds = 10;
    const newBody = await ToLowerCaseData(req.body);
    const {username, email} = newBody;

    const {errors, isValid} = await UsersSignUpValidators(newBody);

    
    const VerifyEmail = await users.findOne({where: { email }});
    
    const VerifyUsername = await users.findOne({where: { username }});

    if(VerifyEmail){ 
        errors.email = 'Email already used.';
        return res.status(400).json(errors);
    }
    
    if(VerifyUsername){ errors.username = 'Username already used.'; return res.status(400).json(errors) }
    
    if(!isValid){ return res.status(400).json(errors) }
    
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    const newUser = await users.create({username, email, password: hash});
    
    const token = await generateJwt({id: newUser.id, username});

    if(newUser){ 
        const createFolder = await folders.create({name: 'Main', usersId: newUser.id, isMain: true});
        if(!createFolder) {
            errors.serverError = 'The server encountered a situation that it does not know how to deal with.'
            const deleting = await users.destroy({where: {id: newUser.id}});
            if(deleting){return res.status(500).json(errors)};
            return res.status(500).json(errors)
        }
        fs.mkdir(`./temp/uploads/${username}`, {recursive: true}, function(err){ if(err){ console.log(new Error (err))} })
        return res.status(200).json({newUser, token})
    } else { 
        return res.status(500).json({serverError: "The server encountered a situation that it does not know how to deal with."})
    };
    
});

router.post('/sign-in', async (req, res) => {
    let getUser = {};
    const newBody = await ToLowerCaseData(req.body);
    const {login, password} = newBody;

    const {errors, isValid} = await UsersSignInValidators(newBody);
    
    if(!isValid){ return res.status(400).json(errors) }

    if(validator.isEmail(login)){
        getUser = await users.findOne({where: { email: login }});
    }else{
        getUser = await users.findOne({where: { username: login }});
    }

    if(!getUser){ 
        errors.credentials = 'Incorrect credentials.';
        return res.status(400).json(errors);
    }

    const match = await bcrypt.compareSync(password, getUser.password);
    
    if(!match){
        errors.credentials = 'Incorrect credentials.';
        return res.status(400).json(errors);
    }

    const token = await generateJwt({id: getUser.id, username: getUser.username});

    return res.status(200).json({getUser, token})
})

module.exports = router;