//Importing packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const ejs = require("ejs");
const cors = require("cors");
const bodyParser = require("body-parser");

//Importing User model
const User = require("./Models/Users.js");

//Initialise application
const app = express();

//Use middleware and templateengine
app.use(bodyParser.json());

//Initialize database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

//Check connection to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected");
});

app.get("/", (req, res) => {

const user = new User({

    _id: mongoose.Types.ObjectId(),
    username: "Test",
    password: "1234",
    email: "david@cbs.dk",
    name: "David",
    age: 20,
    gender: "male",
    preferredGender: "female",
    userInterests: ["Fitness", "Cooking", "Health"],
    image: {imgName: "Test", data: 1234, contentType: "image"},
    role: "admin"

});

user.save().then(result => {

    console.log(result);

}).catch(err => {

    console.log(err);

})

res.status(200).json(user);

});

app.get("/Users/:userId", (req, res) => {

const id = req.params.userId;

User.findById(id)
.then(doc => {

    if (doc){

        res.status(200).json(doc);

    } else {

        res.status(404).json({message: "No user found with given ID"});

    }

})
.catch(err => {
    
    console.log(err)
    res.status(500).json({error: err});

    });
});

app.get("/Users", (req, res) => {

    User.find()
    .then(docs => {

        if (docs) {
            res.status(200).json(docs);
        }else {
            res.status(404).json({message: "No users were found"});
        }
    })
    .catch(err => {

        res.status(500).json({error: err});

    });

});

//Start application
app.listen(3000, () => {

console.log("Server listening on port 3000");

});