const Validator = require('validator');

module.exports = function (data) {
    let errors = {};

    //Validar o tamanho do username
    if(!Validator.isLength(data.username, {min: 3, max: 30})){
        errors.username = 'Username must between 3 and 30 characters.'
    }
    
    //Validar se o campo do username está vazio.
    if(Validator.isEmpty(data.username)){
        errors.username = 'Username field is required.'
    }
    
    //Validar se o email está devidamente escrito.
    if(!Validator.equals(data.email, data.repeat_email)){
        errors.email = 'Emails must match.'
    }
    
    //Validar se o email é realmente um email.
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid.'
    }
    
    //Validar se o email está vazio.
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required.'
    }
    
    //Validar se o campo do repeat_email está vazio.
    if(Validator.isEmpty(data.repeat_email)){
        errors.repeat_email = 'Repeat_email field is required.'
    }
    
    //Validar o tamanho da senha do usuario.
    if(!Validator.isLength(data.password, {min: 5, max: 30})){
        errors.password = 'Password must between 5 and 30 characters.'
    }
    
    //Validar se o campo da senha do usuario está vazia.
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required.'
    }
    
    //Validar se a senha do usuario foi digitada corretamente.
    if(!Validator.equals(data.password, data.repeat_password)){
        errors.repeat_password = 'passwords must match.'
    }
    
    //Validar se o campo do repeat_password está vazio.
    if(Validator.isEmpty(data.repeat_password)){
        errors.repeat_password = 'Repeat_password field is required.'
    }
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
    
}