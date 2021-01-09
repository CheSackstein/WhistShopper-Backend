const express = require("express");
const User = require("../Model/User");
var app = express();
const router = require("express").Router();
const verify = require("./verifyToken");
const dbName = "users";
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

let pets = [];
let pet = {};
let imageFile;
let petDocument = {};

app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("users").collection("pets");
  // perform actions on the collection object
  //client.close();
});

const storage = multer.diskStorage({
  destination: "/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

router.post("/upload", (req, res, next) => {
  imagesJSON.push({ imageFile: req.file.filename });
  const data = JSON.stringify(imagesJSON, null, 2);
  imageFile = req.file.filename;
  fs.writeFile("../images.json", data, function (err) {
    console.log("Saved!");
  });
  console.log(req.file);
});

router.post("/", (req, res, next) => {
  //const imagePath = `../images${req.file}`;
  pet = {
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

  Insert().catch(console.dir);
  client.close();
});

router.get("/", async (req, res) => {
  res.json(pets);
});

// router.get("/json", (req, res) => {
//   res.sendFile(path.join(`${__dirname}/images.json`));
// });

async function Insert() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    const pets_collection = db.collection("pets");

    newUserDB = await pets_collection.insertOne(pet);
    pets.push(pet);
    all_db_pets = await pets_collection.find();

    // Print each user to the console
    all_db_pets.forEach((pet) => res.json(pet));
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
}

async function Display() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const pets_collection = db.collection("pets");

    // Get all users

    client.close();
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
}

module.exports = router;
