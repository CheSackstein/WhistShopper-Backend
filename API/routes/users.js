const express = require("express");
const User = require("../Model/User");
var app = express();
const router = require("express").Router();
const verify = require("./verifyToken");
const dbName = "users";
const fs = require("fs");

const path = require("path");

let cors = require("cors");
const mongoose = require("mongoose");
const imagesJSON = require("../images.json");
const bodyParser = require("body-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect((err) => {
  const collection = client.db("users").collection("users");
  // perform actions on the collection object
  //client.close();
});

let users = [];
let user ={};
let userDocument = {
  
};

app.use(cors());



router.get("/",  (req, res) => {
  res.json(user);
  console.log(user)
userDocument=user;
});

router.post("/",  (req, res, next) => {

  //const imagePath = `../images${req.file}`;
  user = {
      
  };
  users.push(user);
  res.status(201).json();
  run().catch(console.dir);
});




async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);


    const users_collection = db.collection("users");

    newUserDB = await pets_collection.insertOne(user);
    console.log(newUserDB);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}


module.exports = router;
