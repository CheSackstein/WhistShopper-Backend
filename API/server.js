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
const uri = "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/smaple_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("listingsAndReviews");
  // perform actions on the collection object
  console.log(collection)
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

mongoose.connect("mongodb://localhost/fullstack", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));






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

app.get("/users", authenticateToken, (req, res) => {
  console.log(users);
  res.json(users);
});

// app.get('/pets',authenticateToken, (req, res) => {
//   console.log(pets)
//   res.json(pets.filter(pets => pets.username === req.user.username));});

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   console.log(token);
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }
// app.listen(port, () => console.log(`Listening on port ${port}`));

// //

// // console.log that your server is up and running

// // create a GET route
// // app.get('/express_backend', (req, res) => {
// //   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// // });

// // app.post('/express_backend', (req, res) => {
// //   res.json({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// // });

// const express = require("express");
// var multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const uuid = require("uuid").v4;
// var app = express();
// const usersJSON = require('../users.json')
// //const DatauriParser = require("parser");

// const port = 3000;

// app.use(express.static("public"));

// const storage = multer.diskStorage({
//   destination: "/users",

//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, originalname);
//   },
// });
// const upload = multer({ storage });
// const users= [
//   { username:'Me',
// password:'Me'},
// { username:'Me2',
// password:'Me2'}

// ]
// app.get('/users', (req, res) => {
//   res.json(users);
//   console.log(users)
// });
// app.get('/login', (req, res) => {
//   res.json(users);
// });
// // app.post("/upload", upload.array("avatar"), (req, res) => {
// //   res.json({
// //     status: "isOk",
// //     uploaded: req.files.length,
// //     caption: req.body.caption,
// //     imageFile:
// //   });
// //   console.log(req.body.caption);
// //   module.exports = req.body.caption;
// // });

// app.post("/gallery", upload.array("avatar"), (req, res, next) => {
//   console.log(req.file);
//   console.log(req.body);
//   res.send("done");
// });

// // app.post("/express_backend", upload.single("avatar"), (req, res, next) => {
// //   usersJSON.push({ imageFile: 'lol', caption: 'caption' });
// //   const data = JSON.stringify(usersJSON, null, 2);
// //   fs.writeFile("../users.json", data, function (err) {
// //      // res.redirect("./gallery.html")
// //       console.log('Saved!');
// //   });
// //   console.log(req.file);
// //   res.send(data)
// //   console.log(req.body);
// //   });
// // app.get("/json",  (req, res) => {
// //   res.sendFile(path.join(`${__dirname}/users.json`))
// // })

// app.listen(port, () => console.log(`Listening on port ${port}`))
// ;
