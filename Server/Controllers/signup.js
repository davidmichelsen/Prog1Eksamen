//Import packages
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

//Import Usermodel, potential likes and all matches
const Users = require("../Models/Users.js");
const potentialMatches = require("./findPotentials.js");
const allMatches = require("../Controllers/matchUsers.js");

//Setup multer storage for uploaded user images
const storage = multer.diskStorage({

    destination: "./images/",

    filename: (req, file, cb) => {
        cb(null, req.body.email+"-"+path.extname(file.originalname))
    }
});
//Declare upload function which saves to the given storage
const upload = multer({storage: storage});

//Handle signup request
router.post("/", upload.single("image"), (req, res) => {

    //Make sure the request body is not empty
    if (req.body != null) {
    
        //Make sure there is not an existing user with the given email
        if(Users.find(user => user.email == req.body.email)) {

            res.status(404).json({message: "Brugeren eksisterer allerede."});

        }
        
        //Create user object with sent request data
        const newUser = {

            "id": Date.now(),
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
            "age": req.body.age,
            "gender": req.body.gender,
            "preferredGender": req.body.preferredGender,
            "userInterests": req.body.interests.split(", "),
            "image": req.file,
            "role": "user" 

        }

        //Add new user object to the rest of the existing users
        Users.push(newUser);

        const jsonString = JSON.stringify(Users);

        //Save all users again
        fs.writeFile(path.join(__dirname, "../Models/Users.json"), jsonString, (err) => {

            if (err) {

                res.status(500).json({error: err});

            }

            res.status(200).json({"user": newUser, "potentials": potentialMatches.findPotentialMatches(), "allMatches": allMatches.matchUsers()});

        });

    }
    
    });

//Handle GET request to signup, which is not possible
router.get("/", (req, res) => res.send("Hov! - Du er vist havnet det forkerte sted. Åben HTML side for log ind og oprettelse."));

//Export router object to app.js
module.exports = router;