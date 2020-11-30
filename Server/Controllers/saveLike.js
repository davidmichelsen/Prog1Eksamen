const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");


router.post("/like", (req, res) => {

    var userOne = req.body.userOne;
    var userTwo = req.body.userTwo;
    var likes = [];

    try {

        const stringLikes = fs.readFileSync(path.join(__dirname, "../Models/Likes.json"));

        var allLikes = JSON.parse(stringLikes);

        if(allLikes[userOne.email]) {

            likes = allLikes[userOne.email];

        }

        var hasUser = false;

        for(i=0; i < likes.length; i++) {

            if (likes[i].email == userTwo.email) {

                hasUser = true;

            }

        }

        if(hasUser == false) {

            likes.push({name: userTwo.name, age: userTwo.age, email: userTwo.email});

        }

        allLikes[userOne.email] = likes;

        const newString = JSON.stringify(allLikes);

        try {

            fs.writeFileSync(path.join(__dirname, "../Models/Likes.json"), newString);

            res.status(200).json({message: "like gemt"});

        } catch(err) {

            if (err) {console.log(err);}
            
        }

    } catch(err) {

        if (err) {

            console.log(err);

        }

    }

});


module.exports = router;