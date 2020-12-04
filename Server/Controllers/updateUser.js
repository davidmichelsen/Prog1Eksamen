//Import packages
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

//Import Usermodel
const allUsers = require("../Models/Users.js");


//Handle request for update user
router.post("/user/:id", (req, res) => {

    var id = req.params.id

    //Find current user and what information needs to be changed based on request body
    var foundUser = allUsers.find(user => user.id == id);

        if (req.body.name != undefined) {

            foundUser.name = req.body.name;

        } else if (req.body.email != undefined) {

            foundUser.email = req.body.email;

        } else if (req.body.age != undefined) {

            foundUser.age = req.body.age;

        } else if (req.body.interests != undefined) {

            foundUser.userInterests = req.body.interests.split(", ");

        }
    
    //try/catch to prevent unhandled error throws.
    try {
        
        fs.writeFileSync(path.join(__dirname, "../Models/Users.json"), JSON.stringify(allUsers));

        res.status(200).json({"user":foundUser});

    } catch (err) {

        if (err) {

            res.status(500).json({error: err});

        }
        
    }    

});


//Handle request for delete user
router.post("/delete", (req, res) => {

    //Find user based on email and remove from all users
    for(i=0; i < allUsers.length; i++) {

        if(allUsers[i].email == req.body.email) {

            allUsers.splice(i, 1);

        }

    }

    //Save new array of all users without the deleten current user. try/catch to handle errors
    try {
        
        fs.writeFileSync(path.join(__dirname, "../Models/Users.json"), JSON.stringify(allUsers), (err) => {

            if(err) {

                console.log(err);

            }

            res.status(200).json({"status": "Slettet!"});

        });

    } catch (err) {

        if (err) {

            res.status(500).json({error: err});

        }
        
    }   

});

//Handle delete match request
router.post("/deleteMatch", (req, res) => {

    //Save sent match and user email
    const matchEmail = req.body.matchEmail;
    const myEmail = req.body.myEmail;

    //Try to read JSON files for Likes and Matches to get current likes and matches
    try{

        //Get all likes
        const stringLikes = fs.readFileSync(path.join(__dirname, "../Models/Likes.json"));
        const likes = JSON.parse(stringLikes);

        //Get all matches
        const stringMatches = fs.readFileSync(path.join(__dirname, "../Models/Matches.json"));
        const foundMatches = JSON.parse(stringMatches);

        //Remove the given match from the user's likes and matches array
        for(i=0; i < likes[myEmail].length; i++) {

            if (likes[myEmail][i].email == matchEmail) {

                likes[myEmail].splice(i, 1);

            }

        }

        for(i=0; i < foundMatches[myEmail].length; i++) {

            if (foundMatches[myEmail][i].email == matchEmail) {

                foundMatches[myEmail].splice(i, 1);

            }

        }

        //Remove the current user from the match's matches array
        for(i=0; i < foundMatches[matchEmail].length; i++) {

            if (foundMatches[matchEmail][i].email == myEmail) {

                foundMatches[matchEmail].splice(i, 1);

            }

        }

        //Save all likes and matches again without the delete data
        fs.writeFileSync(path.join(__dirname, "../Models/Likes.json"), JSON.stringify(likes));

        fs.writeFileSync(path.join(__dirname, "../Models/Matches.json"), JSON.stringify(foundMatches));

        res.status(200).json({"allMatches": foundMatches});

    }catch(err) {

        if (err) {

            console.log(err);
            res.status(500).json({"error": err});

        }

    }


});

//Export router object back to app.js
module.exports = router;