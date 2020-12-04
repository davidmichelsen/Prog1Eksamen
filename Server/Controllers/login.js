//Import packages
const express = require("express");
const router = express.Router();

//Import Usermodel, potential likes and all matches
const Users = require("../Models/Users.js");
const potentialMatches = require("./findPotentials.js");
const allMatches = require("../Controllers/matchUsers.js");

//Handle log in request
router.post("/", (req, res) => {

    //Make sure the sent request body is not empty
    if(req.body != null) { 

        //Find a user with the sent email
        const currentUser = Users.find(user => user.email == req.body.email);

        //Handle error in case no user exists
        if(!currentUser) {

            res.status(404).json({error: "No user exists with given information"})

        }

        //Make sure the password that was sent also coheres with the saved password for the given mail
        if (currentUser.password == req.body.password) {

            res.status(200).json({"user": currentUser, "potentials": potentialMatches.findPotentialMatches(), "allMatches": allMatches.matchUsers()});

        } else {

            res.status(401).json({message: "Unauthorized"});

        }

    }


    });

//Handle GET request to login
router.get("/", (req, res) => res.send("Hov! - Du er vist havnet det forkerte sted. Åben HTML side for log ind og oprettelse."));

//Export router object to app.js
module.exports = router;