const express = require("express");
const User = require("../Model/User");
var app = express();
const router = require("express").Router();
const verify = require("./verifyToken");
const dbName = "pets";
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const filePath = "./pets.json";
let cors = require("cors");
const mongoose = require("mongoose");
const imagesJSON = require("../images.json");
const bodyParser = require("body-parser");
const uuid = require("uuid").v4;
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

let pets = [];
let imageFile;
let petDocument = {
  type: "Golden Retreiver",
  name: "Goldy",
  status: "Adopted",
  picture: "url123",
  height: "12cm",
  weight: "10kgs",
  color: "Grey",
  bio: "Super cute, friendly and woofs along to any love song",
  hypoAllergenic: "Yes",
  restrictions: "None",
  breed: "Schnauzer",
};

app.use(cors());

const storage = multer.diskStorage({
  destination: '/uploads',
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

router.post("/upload",(req, res, next) => {
  imagesJSON.push({ imageFile: req.file.filename});
  const data = JSON.stringify(imagesJSON, null, 2);
 imageFile = req.file.filename;
  fs.writeFile("../images.json", data, function (err) {
    console.log("Saved!");
  });
  console.log(req.file);
  

});
router.post("/",  (req, res, next) => {

  //const imagePath = `../images${req.file}`;
  const pet = {
    type: req.body.type,
    name: req.body.name,
    status: req.body.status,
    picture: imageFile,
    height: req.body.height,
    weight: req.body.weight,
    color: req.body.color,
    bio: req.body.bio,
    hypoAllergenic: req.body.hypoAllergenic,
    restrictions: req.body.restrictions,
    breed: req.body.breed,
  };
  pets.push(pet);
  res.status(201).json();
});

router.get("/",  (req, res) => {
  res.json(pets);

 
});

router.get("/json", (req, res) => {
  res.sendFile(path.join(`${__dirname}/images.json`));
});


async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);


    const pets_collection = db.collection("pets");

    newUserDB = await pets_collection.insertOne(petDocument);
    console.log(newUserDB);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
module.exports = router;
