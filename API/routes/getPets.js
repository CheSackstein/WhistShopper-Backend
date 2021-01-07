const express = require("express");
const User = require("../Model/User");
var app = express();
const router = require("express").Router();
const dbName = "users";
let cors = require("cors");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();

app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect((err) => {
  const collection = client.db("users").collection("pets");
  // perform actions on the collection object
  //client.clos
})

router.get('/', (req,res)=> {


Display().catch(console.dir);
})
async function Display() {
    try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
  
      // Use the collection named "users"
      const pets_collection = db.collection("pets");
  
      // Get all users
      all_db_pets = await pets_collection.find();
  
      // Print each user to the console
      all_db_pets.forEach((pet) => console.log(pet));
      
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }}}
module.exports = router;
