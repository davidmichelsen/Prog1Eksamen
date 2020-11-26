const express = require("express");
const router = express.Router();
const Users = require("../Models/Users.js");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

//Setup multer storage for uploaded user images
const storage = multer.diskStorage({

    destination: "./images/",

    filename: (req, file, cb) => {
        cb(null, req.body.email+"-"+path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});

router.post("/", upload.single("image"), (req, res) => {

    if (req.body != null) {
    
        if(Users.find(user => user.email == req.body.email)) {

            res.status(404).json({message: "Brugeren eksisterer allerede."});

        }

        const newUser = {

            "id": Date.now(),
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
            "age": req.body.age,
            "gender": req.body.gender,
            "preferredGender": req.body.prefGender,
            "userInterests": req.body.interests,
            "image": req.file,
            "role": "user" 

        }

        Users.push(newUser)

        const jsonString = JSON.stringify(Users);

        try {

            fs.writeFileSync(path.join(__dirname, "../Models/Users.json"), jsonString);
            res.status(200).json(newUser);

        } catch(error) {

            if (error) {

                res.status(500).json({error: error});

            }

        }

    }
    
    });

router.get("/", (req, res) => res.send("Hov! - Du er vist havnet det forkerte sted. Åben HTML side for log ind og oprettelse."));


module.exports = router;