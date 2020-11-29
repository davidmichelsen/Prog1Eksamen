//Importing packages
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const loginController = require("./Controllers/login.js");
const signupController = require("./Controllers/signup.js");
const saveLikeController = require("./Controllers/saveLike.js");
const updateUser = require("./Controllers/updateUser.js");

//Initialise application
const app = express();

//Use middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./images/")));
app.use("/login", loginController);
app.use("/signup", signupController);
app.use("/action", saveLikeController);
app.use("/update", updateUser);

app.get("/", (req, res)=> {

    res.send("Hov! - Du er vist havnet det forkerte sted. Åben HTML side for log ind og oprettelse.");

});

//Start application
app.listen(3000, () => {

console.log("Server listening on port 3000");

});