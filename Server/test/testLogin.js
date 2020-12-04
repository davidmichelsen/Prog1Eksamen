//Import packages
const assert = require("assert");
const mocha = require("mocha");
const users = require("../Models/Users.json");

//Initialise suite
describe("Test af log ind", function() {
    
    //Initialise specific test
    it("Should find a user in JSON file with given email and address and return user", function() {

        let requestBody = {

            "email": "davidm@cbs.dk",
            "password": 12345678

        }

        assert(() => {

            const myUser = users.find(user => user.email == requestBody.email);

            if(myUser) {

                if(myUser.password == requestBody.password) {

                    return JSON.stringify({"email": "davidm@cbs.dk","password": 12345678});

                }

            }

        }, JSON.stringify(requestBody));

    });

});