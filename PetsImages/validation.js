const Joi = require('@hapi/joi')


//Register Validation
const registerValidation = (data) => {
const schema = {
    FirstName: Joi.string().min(1).required(),
    LastName: Joi.string().min(1).required(),
    Phone:Joi.string().min(10).required(),
    Email: Joi.string().min(6).required().email(),
    Password: Joi.string().min(6).required(),
    PasswordConfirm: Joi.string().min(6).required()
}
 return Joi.validate(data, schema);

 

}

const loginValidation = (data) => {
    const schema = {
        Email: Joi.string().min(6).required().email(),
        Password: Joi.string().min(6).required()
    }
     return Joi.validate(data, schema);
 
    
    }
    

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;