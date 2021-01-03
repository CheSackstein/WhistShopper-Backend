const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({

    FirstName : {
        type: String,
        required: true,
        min : 1
    },
    LastName : {
        type: String,
        required: true,
        min : 2
    },
    Phone : {
        type: String,
        required: true,
        min : 6
    },
    Email :{
    type: String,
    required: true,
    max : 255,
    min : 6
}, Password :{
    type: String,
    required: true,
    max : 1024,
    min : 6
},
PasswordConfirm :{
    type: String,
    required: true,
    max : 1024,
    min : 6
},
date :{
    type: Date,
    default: Date.now()
}})

module.exports = mongoose.model('User', userSchema);