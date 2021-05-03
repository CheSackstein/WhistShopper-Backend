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

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://alberto:pass@lel-kicis.mongodb.net/test";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("students")
//    .then(db => console.log('DB conectada'))
//    .catch(err => console.log(error));
//  });
const MongoClient = require('mongodb').MongoClient;
const uri =  "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/pets?retryWrites=true&w=majority&tls=true";
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("pets").collection("users");
  // perform actions on the collection object
  console.log(collection)
 // client.close();
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

// mongoose.connect("mongodb://localhost/fullstack", {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to Mongoose"));



app.get("/login", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hash(req.body.password, 10);

    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).json();
  } catch {
    res.status(500).send();
  }
});


app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.username === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.get("/users", (req, res) => {
  console.log(users);
  res.json(users);
});

app.get('/pets',(req, res) => {
  console.log(pets)
  res.json(pets.filter(pets => pets.username === req.user.username));});

