if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

require("dotenv").config();
const { config } = require("dotenv");
const express = require("express");
var app = express();
const port = 5000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const users = [
  { username: "Me", password: "Me" },

  { username: "Me2", password: "Me2" },
];
var cors = require("cors");

app.use(cors());
app.use(express.json());

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/pets?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const collection = client.db("pets").collection("pets");
  // perform actions on the collection object
  client.close();
});

function getAllFuncs(toCheck) {
  var props = [];
  var obj = toCheck;
  do {
    props = props.concat(Object.getOwnPropertyNames(obj));
  } while ((obj = Object.getPrototypeOf(obj)));

  return props.sort().filter(function (e, i, arr) {
    if (e != arr[i + 1] && typeof toCheck[e] == "function") return true;
  });
}

console.log(getAllFuncs(client));

mongoose.connect(
  "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/pets?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));
//console.log(db)
//   db.collection.insertOne(
//     { type:'schnauzer', name:'Fluffy', status:'Adopted', picture:'url123', height:'12cm', weight:'10kgs', color:'Grey', bio:'Super cute, friendly and woofs along to any love song', HypoAllergenic:'Yes', Restrictions:'None', Breed:'Schnauzer'}
//  )
// db.collection("pets").insertOne({
//   type: "schnauzer",
//   name: "Fluffy",
//   status: "Adopted",
//   picture: "url123",
//   height: "12cm",
//   weight: "10kgs",
//   color: "Grey",
//   bio: "Super cute, friendly and woofs along to any love song",
//   HypoAllergenic: "Yes",
//   Restrictions: "None",
//   Breed: "Schnauzer",
// });
// console.log(db.collection("pets"));

// app.post("/pets", (req, res, next) => {
//   const pet = {
//     type: "schnauzer",
//     name: "Fluffy",
//     status: "Adopted",
//     picture: "url123",
//     height: "12cm",
//     weight: "10kgs",
//     color: "Grey",
//     bio: "Super cute, friendly and woofs along to any love song",
//     HypoAllergenic: "Yes",
//     Restrictions: "None",
//     Breed: "Schnauzer",
//   };
//   pets.push(pet);
//   res.status(201).json();
// });

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
 

    // Use the collection "people"
    const col = db.collection("pets");

    // Construct a document
    let petDocuments = [{
      type: "Shiatzu",
      name: "James",
      status: "Adopted",
      picture: "url1234",
      height: "15cm",
      weight: "8kgs",
      color: "Grey",
      bio: "Loves tickles and is a sucker for snacks",
      HypoAllergenic: "Yes",
      Restrictions: "None",
      Breed: "Shiatzu",
    },
    {
      type: "Sausage Dog",
      name: "Shoko",
      status: " Not Adopted",
      picture: "url12345",
      height: "15cm",
      weight: "8kgs",
      color: "Black",
      bio: "Shoko loves to laze around and is the best cuddler! Looking for a cuddlebuddy? Shoko is your perfect match",
      HypoAllergenic: "Yes",
      Restrictions: "None",
      Breed: "Sausage Dog",
    },
    {
      type: "Golden Retriever",
      name: "Honey",
      status: "Adopted",
      picture: "url12345",
      height: "80cm",
      weight: "14kgs",
      color: "Golden",
      bio: "Beauiful, playful pup looking for a loving, energetic family",
      HypoAllergenic: "No",
      Restrictions: "None",
      Breed: "Golden Retriever",
    }];

    // Insert a single document, wait for promise so we can read it back
    const p = await col.insertMany(petDocuments);
    db.collection("pets").insertMany(petDocuments);
    // Find one document
    const myDoc = await col.findOne();
    // Print to the console
    console.log(petDocuments);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
