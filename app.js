require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//Initialise application
const app = express();

//Initialize database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

//Check connection to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected");
});


//Start application
app.listen(3000, () => {

console.log("Server listening on port 3000");

});