const express = require("express");
const router = express.Router();
const allUsers = require("../Models/Users.js");
const fs = require("fs");
const path = require("path");

router.post("/:id", (req, res) => {

    var id = req.params.id

    var foundUser = allUsers.find(user => user.id == id);

        if (req.body.name != undefined) {

            foundUser.name = req.body.name;

        } else if (req.body.email != undefined) {

            foundUser.email = req.body.email;

        } else if (req.body.age != undefined) {

            foundUser.age = req.body.age;

        } else if (req.body.interests != undefined) {

            foundUser.userInterests = req.body.interests;

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

module.exports = router;