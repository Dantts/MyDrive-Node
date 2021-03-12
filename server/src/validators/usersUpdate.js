const Validator = require('validator');

module.exports = function (data) {
    let errors = {};
    
    if(data.new_email){
        //Validar se o email é realmente um email.
        if(!Validator.isEmail(data.new_email)){
            errors.email = 'Email is invalid.'
        }

        //Validar se o email está vazio.
        if(Validator.isEmpty(data.new_email)){
            errors.email = 'Email field is required.'
        }
    }
    
    if(data.new_password){
        //Validar o tamanho da senha do usuario.
        if(!Validator.isLength(data.new_password, {min: 5, max: 30})){
            errors.password = 'Password must between 5 and 30 characters.'
        }
        
        //Validar se o campo da senha do usuario está vazia.
        if(Validator.isEmpty(data.new_password)){
            errors.password = 'Password field is required.'
        }
        
        //Validar se o campo da senha do usuario está vazia.
        if(Validator.isEmpty(data.current_password)){
            errors.password = 'Current password field is required.'
        }
    }
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
    
}