//Importing packages
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const loginController = require("./Controllers/login.js");
const signupController = require("./Controllers/signup.js");

//Initialise application
const app = express();

//Use middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./images/"));
app.use("/login", loginController);
app.use("/signup", signupController);

app.get("/", (req, res)=> {

    res.send("Hov! - Du er vist havnet det forkerte sted. Åben HTML side for log ind og oprettelse.");

});

app.get("/test", (req, res) => {

    res.send("http://localhost:3000/34ECD41B-010A-4991-AC78-DEA1818075AD_1_105_c.jpeg");

});

app.post("/update/:id", (req, res) => {

    var id = req.params.id

    User.find({_id: id})
    .then(users => {

        if(users.length > 0) {

            if (req.body.name != undefined) {

                users[0].name = req.body.name;

            } else if (req.body.email != undefined) {

                users[0].email = req.body.email;

            } else if (req.body.age != undefined) {

                users[0].age = req.body.age;

            } else if (req.body.interests != undefined) {

                users[0].userInterests = req.body.interests;

            }

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