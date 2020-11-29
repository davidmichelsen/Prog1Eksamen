const express = require("express");
const router = express.Router();
const Users = require("../Models/Users.js");
const potentialMatches = require("./findPotentials.js");

router.post("/", (req, res) => {

    if(req.body != null) { 

        const potentials = potentialMatches.findPotentialMatches();

        const currentUser = Users.find(user => user.email == req.body.email);

        if (currentUser.password == req.body.password) {

            res.status(200).json({"user": currentUser, "potentials": potentials});

        } else {

            res.status(401).json({message: "Unauthorized"});

        }

    }


    });

router.get("/", (req, res) => res.send("Hov! - Du er vist havnet det forkerte sted. Åben HTML side for log ind og oprettelse."));


module.exports = router;