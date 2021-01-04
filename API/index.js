if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  


const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose')
const authRoute = require('./routes/auth');
const petRoute = require('./routes/pets');
const EditPetRoute = require('./routes/EditPet');
const DeletePetRoute = require('./routes/DeletePet');

require("dotenv").config();

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
  
  var cors = require("cors"); 
  
  app.use(cors());
  app.use(express.json());

  app.use('/api/user', authRoute);
  app.use('/api/pets', petRoute);
  app.use('/api/EditPet', EditPetRoute);
  app.use('/api/DeletePet', DeletePetRoute);
  

app.listen(port, () => console.log(`Listening on port ${port}`))
