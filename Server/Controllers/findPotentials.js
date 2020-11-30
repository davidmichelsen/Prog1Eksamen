const fs = require("fs");
const path = require("path");
var dictionary = {};

function findPotentials() {

    try {

        const jsonUsers = fs.readFileSync(path.join(__dirname, "../Models/Users.json"));
        const users = JSON.parse(jsonUsers);
        
        for(i=0; i < users.length; i++) {
        
            var potentials = [];
        
            if(dictionary[users[i].email]) {
        
                potentials = dictionary[users[i].email];
        
            }
        
            for(j=0; j < users.length; j++) {
        
                if (i != j) {
        
                    if (matchUsers(users[i], users[j]) == true) {
        
                        if(!potentials.includes(users[j])) {
        
                        potentials.push(users[j]);
        
                        }
        
                    }
                        
                }
        
            }
        
            dictionary[users[i].email] = potentials;

        }
        
        return dictionary;
        
        } catch(error) {
        
            if(error) {
        
                console.log(error);
        
        }
        
    }

} 
    
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

module.exports = {

    findPotentialMatches: findPotentials

}

findPotentials();


