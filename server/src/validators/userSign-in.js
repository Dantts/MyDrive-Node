const Validator = require('validator');

module.exports = function (data) {
    let errors = {};

    //Validar se o login está vazio.
    if(Validator.isEmpty(data.login)){
        errors.email = 'Login field is required.'
    }
    
    //Validar se o campo da senha do usuario está vazia.
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required.'
    }
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
    
}