const router = require('express').Router();
const User = require('../Model/User')
const { registerValidation, loginValidation } = require('../../PetsImages/validation')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require("dotenv");
const express = require('express');
const { Schema } = require('mongoose');
const { validate } = require('uuid');

const app = express();
require("dotenv").config({path: '../env.env'});
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  


router.post('/register',async (req,res) => {

//Validation

const { error }= registerValidation(req.body);

if (error){
    return res.status(400).send(error.details[0].message.error)
} 

//Check if the user is in the database
const emailExist  = await User.findOne({Email : req.body.Email})
if (emailExist) return res.status(400).send('Email already exists')

//Hashing the password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.Password, salt);


const user = new User ({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Phone:req.body.Phone,
    Email: req.body.Email,
    Password: hashedPassword,
    PasswordConfirm: hashedPassword

})

try{
    const savedUser = await user.save()
    res.send({ user : user.Email})
 } catch(err){
     res.status(400).send(err)

 }
}
)


//Login
router.post('/login',async (req,res) => {
//Validation

const { error }= loginValidation(req.body);

if (error){
    return res.status(400).send(error.details[0].message.error)
} 

//Check if the user is in the database
const user  = await User.findOne({Email : req.body.Email})
if (!user) return res.status(400).send('Email or password is incorrect.')

//Checking if password is correct
const validPass = await bcrypt.compare(req.body.Password, user.Password)
if (!validPass) return res.status(400).send('Invalid password')


//Create and assign a token
const token = jwt.sign({_id : user._id}, process.env.ACCESS_TOKEN_SECRET) ;
res.header('auth-token', token).send(token);
res.send('Logged in!')
})




module.exports = router;