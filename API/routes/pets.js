const express = require("express");
const User = require("../Model/User");
var app = express();
const router = require('express').Router()
const verify = require('./verifyToken')
const pets= [
{
    name:'FLUFFY',
    type:'Scnauzer',
    color:'Grey',
    HypoAllergenic:'Yes'
}

]


router.post("/", verify, (req, res, next) => {
 const pet= { name :req.body.name, type:req.body.type, color:req.body.color, HypoAllergenic:req.body.HypoAllergenic };
 pets.push(pet);
 res.status(201).json()
});

router.get('/', verify, (req, res) => {
  res.json(pets);

  console.log(pets)
});

module.exports = router;