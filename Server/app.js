//Importing packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
var isLoggedIn = false;

//Importing User model
const User = require("./Models/Users.js");

//Setup multer storage for uploaded user images
const storage = multer.diskStorage({

    destination: "./images/",

    filename: (req, file, cb) => {
        cb(null, req.body.email+"-"+path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});

//Initialise application
const app = express();

//Use middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./images/"));
app.use(express.static("./Views/CSS"));
app.set("view-engine", "ejs");

//Initialize database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

//Check connection to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected");
});

app.get("/", (req, res)=> {

    res.render("frontPage.ejs");

});

app.get("/Users", (req, res) => {

    User.find()
    .then(docs => {

        if (docs) {
            res.status(200).json(docs);
        }else {
            res.status(404).json({message: "No users were found"});
        }
    })
    .catch(err => {

        res.status(500).json({error: err});

    });

});

app.post("/signup", upload.single("image"), (req, res) => {

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
    
                res.status(200).render("homePage.ejs", {user: result});
                isLoggedIn = true;
    
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

app.post("/login", (req, res) => {

if (req.body != null) {

    User.find({email: req.body.email})
    .then(users => {

        if (users.length < 1) {

            res.status(401).json({message: "Unauthorized"});

        }

        if (users[0].password == req.body.password && users[0].role == req.body.role) {

            if(users[0].role == "admin") {

            res.status(200).render("admin.ejs", {user: users[0]});
            

            }

            if(users[0].role == "user") {

            res.status(200).render("homePage.ejs", {user: users[0]});
            
            }

        } else {

            res.status(401).json({message: "Unauthorized"});

        }

    })
    .catch(err => res.status(404).json({error: err}));

};

});

app.get("/login", (req, res) => res.redirect("/"));

app.get("/signup", (req, res) => res.redirect("/"));

app.get("/test", (req, res) => {

    res.send("http://localhost:3000/34ECD41B-010A-4991-AC78-DEA1818075AD_1_105_c.jpeg");

});

app.post("/update/:id", (req, res) => {

    var id = req.params.id

    User.find({_id: id})
    .then(users => {

        if(users.length > 0) {

            users[0].name = req.body.name;

            users[0].save()
            .then(result => {

                if(result) {

                    res.status(200);

                } else {res.json({error: "couldn't update user"})}

            })
            .catch(err => {
                
                if (err) {

                    res.json({error: err})

                }

            });

        } else {res.status(404).json({message: "No users"})}

    })
    .catch(err => {

        if (err) {

            res.status(404).json({error: err});

        }

    });

});

//Start application
app.listen(3000, () => {

console.log("Server listening on port 3000");

});