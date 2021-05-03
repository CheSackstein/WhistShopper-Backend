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
const { ObjectId } = require("mongodb");
const uri = "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("users").collection("pets");
  // perform actions on the collection object
  //client.close();
});


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
    
   let updated_pet = await pets_collection.updateOne(
        {
          _id: ObjectId("5ff222694f9b095ba0232b32"),
        },
        { $set: { name: "enaJ" } }
      );
      console.log(updated_pet);
  
      let one_db_pet = await pets_collection.findOne({
        _id: ObjectId("5ff222694f9b095ba0232b32"),
      });
      console.log(one_db_pet);
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