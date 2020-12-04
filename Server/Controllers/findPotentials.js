//Import packages
const fs = require("fs");
const path = require("path");
var dictionary = {};

//Declare function for finding potential likes
function findPotentials() {

    //try/catch to handle errors of loading JSON files
    try {

        //Get all existing users. I read directly from the JSON file instead of importing Usermodel
        //because the Usermodel that finds the users only reads from the file when server is initially started
        const jsonUsers = fs.readFileSync(path.join(__dirname, "../Models/Users.json"));
        const users = JSON.parse(jsonUsers);
        
        //I assign already existing potential likes to the empty array for all users
        for(i=0; i < users.length; i++) {
        
            var potentials = [];
        
            if(dictionary[users[i].email]) {
        
                potentials = dictionary[users[i].email];
        
            }

            //Iterate over all users again to get a second user
            for(j=0; j < users.length; j++) {

                var hasUser = false;
        
                //Make sure the loops aren't looking at the same user
                if (i != j) {
        
                    //Use the algorith to check if the to users are compatible
                    if (matchUsers(users[i], users[j]) == true) {
                        
                        //Make sure not to add same users multiple times
                        for(l = 0; l < potentials.length; l++) {

                            if(potentials[l].email == users[j].email) {

                                hasUser = true 

                            }

                        }

                        //Add compatible user to the potential likes
                        if(hasUser == false) {
        
                        potentials.push(users[j]);
        
                        }
        
                    }
                        
                }
        
            }
        
            //Save the compatible users for the potential likes
            dictionary[users[i].email] = potentials;

        }
        
        //Export the potential likes
        return dictionary;
        
        } catch(error) {
        
            if(error) {
        
                console.log(error);
        
        }
        
    }

} 
    //Declare algorith to find out if two users are compatible based on sex, age and interests
    function matchUsers(matchOne, matchTwo){
    
        if (matchOne.preferredGender == matchTwo.gender && matchTwo.preferredGender == matchOne.gender) {
    
        var equalInterests = 0;
        var correctAge = false;
    
        if (Math.abs(matchOne.age - matchTwo.age) <= 10) {
    
            correctAge = true;
    
        }
    
        for(k = 0; k < matchOne.userInterests.length; k++) {
    
            for(l = 0; l < matchOne.userInterests.length; l++) {
    
                    if (matchOne.userInterests[k] == matchTwo.userInterests[l]) {
    
                        equalInterests += 1;
            
                }
    
            }
    
        }
    
        if (equalInterests >= 2 && correctAge == true) {
    
            return true;
    
        } else {
    
            return false;
    
        }
    
    }
    
    return false;
    
    };

//Export function for finding potential likes
module.exports = {

    findPotentialMatches: findPotentials

}


