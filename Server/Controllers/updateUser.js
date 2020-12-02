const express = require("express");
const router = express.Router();
const allUsers = require("../Models/Users.js");
const fs = require("fs");
const path = require("path");

router.post("/user/:id", (req, res) => {

    var id = req.params.id

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

    try {
        
        fs.writeFileSync(path.join(__dirname, "../Models/Users.json"), JSON.stringify(allUsers));

        res.status(200).json({"user":foundUser});

    } catch (err) {

        if (err) {

            res.status(500).json({error: err});

        }
        
    }    

});

router.post("/delete", (req, res) => {

    console.log(req.body.email);

    for(i=0; i < allUsers.length; i++) {

        if(allUsers[i].email == req.body.email) {

            allUsers.splice(i, 1);

        }

    }

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

module.exports = router;