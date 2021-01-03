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
    "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/users?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("users").collection("users_info");
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
    "mongodb+srv://Che:Cheche2012@cluster0.mox7t.mongodb.net/users?retryWrites=true&w=majority",
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
      const col = db.collection("users_info");
  
      // Construct a document
       const userDocuments = [{
      FirstName: 'Jennifer',
      LastName: 'James',
      Phone: '051 789 6543',
      Email: 'jenjames@gmail.com',
      Password: 'voco8896g',
      PasswordConfirm: 'voco8896g',
    },
    { FirstName: 'lily',
    LastName: 'James',
    Phone: '051 769 6543',
    Email: 'lilyjames@gmail.com',
    Password: 'vguyg96g',
    PasswordConfirm: 'vguyg96g',
  },
  { FirstName: 'Aaron',
  LastName: 'Leeds',
  Phone: '051 789 8888',
  Email: 'aaronl@gmail.com',
  Password: '1234567',
  PasswordConfirm: '1234567',
}]
  
      // Insert a single document, wait for promise so we can read it back
      const p = await col.insertMany(userDocuments);
      db.collection("users_info").insertMany(userDocuments);
      // Find one document
      const myDoc = await col.findOne();
      // Print to the console
      console.log(userDocuments);
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);