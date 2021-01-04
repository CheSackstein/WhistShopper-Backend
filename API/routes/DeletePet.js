const express = require("express");
const User = require("../Model/User");
var app = express();
const router = require("express").Router();
const verify = require("./verifyToken");
const dbName = "pets";
let cors = require("cors");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require("mongodb");
const uri = "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("users").collection("pets");
  // perform actions on the collection object
  //client.close();
});
// const MongoClient = require("mongodb").MongoClient;
// const { ObjectID } = require("mongodb");
// const uri =
//   "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/users?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
// client.connect((err) => {
//   const collection = client.db("users").collection("pets");
//   // perform actions on the collection object
//  // client.close();
// });

let pets = [];



app.use(cors());


async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const pets_collection = db.collection("pets");
console.log('hi')
    
   
let deleted_from_db = await pets_collection.deleteOne({
    _id: ObjectID("5ff222694f9b095ba0232b32"),
  });
  console.log(deleted_from_db);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

router.get("/", verify, (req, res) => {
  res.json(pets);

  console.log(pets);
});
//run().catch(console.dir);
module.exports = router;