//Import packages
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

//Import all matches
const matches = require("./matchUsers.js");

//Handle request to user saved another user
router.post("/like", (req, res) => {

    //Save the current user and the one that was liked
    var userOne = req.body.userOne;
    var userTwo = req.body.userTwo;
    var likes = [];

    //try/catch to handle any unforseen errors
    try {

        //Get all preexisting likes
        const stringLikes = fs.readFileSync(path.join(__dirname, "../Models/Likes.json"));

        var allLikes = JSON.parse(stringLikes);

        //Check if current user already has any matches
        if(allLikes[userOne.email]) {

            likes = allLikes[userOne.email];

        }

        var hasUser = false;

        //Check if the user that was liked has already been liked by the current user
        for(i=0; i < likes.length; i++) {

            if (likes[i].email == userTwo.email) {

                hasUser = true;

            }

        }

        //If not, save the liked user in the likes array for the current user
        if(hasUser == false) {

            likes.push({name: userTwo.name, age: userTwo.age, email: userTwo.email});

        }

        //Reassign array of likes to all likes
        allLikes[userOne.email] = likes;

        const newString = JSON.stringify(allLikes);

        //Save all likes to JSON file again
        fs.writeFile(path.join(__dirname, "../Models/Likes.json"), newString, (err) => {

            if (err) {

                console.log(err);

            }

            res.status(200).json({message: "like gemt", "allMatches": matches.matchUsers()});

        });


    } catch(err) {

        if (err) {

            console.log(err);

        }

    }

});

//Export router object to app.js
module.exports = router;