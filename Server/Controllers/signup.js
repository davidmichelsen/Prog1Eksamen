const express = require("express");
const router = express.Router();
const Users = require("../Models/Users.js");
const multer = require("multer");

//Setup multer storage for uploaded user images
const storage = multer.diskStorage({

    destination: "../images/",

    filename: (req, file, cb) => {
        cb(null, req.body.email+"-"+path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});

router.post("/signup", upload.single("image"), (req, res) => {

    if (req.body != null) {
    
        User.find({email: req.body.email})
        .then(users => {
    
            if (users.length > 0) {
    
                res.status(404).json({message: "A user already exists with the given email"});
    
            } 
    
            const user = new User({
    
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender,
                preferredGender: req.body.preferredGender,
                userInterests: req.body.interests.split(", "),
                image: req.file,
                role: "user"
        
            });
        
            user.save()
            .then(result => {
        
                if (result) {
        
                    res.status(200).json(result);
        
                } else {
        
                    res.status(404).json({message: "Couldn't create user"});
        
                }
        
            })
            .catch(err => {
        
                if (err) {
        
                    console.log(err);
                    res.status(500).json({error: err});
        
                }
        
            });
    
    
        })
        .catch(err => res.status(404).json({error: err}));
    
    
    } else {
    
        res.send("No information was entered");
    
    }
    
    });

router.get("/signup", (req, res) => res.send("Hov! - Du er vist havnet det forkerte sted. Åben HTML side for log ind og oprettelse."));


module.exports = router;