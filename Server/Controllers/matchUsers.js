//Import packages
const fs = require("fs");
const path = require("path");
const dictionary = {};

//Declare function for matching users who have liked each other
function matchUsers() {

    //Handle errors of loading JSON files with try/catch
    try {

    //Get all likes
    const string = fs.readFileSync(path.join(__dirname, "../Models/Likes.json"));
    const likes = JSON.parse(string);

    //Get an array of the keys(emails of the users) in front of the like-arrays
    const keys = Object.keys(likes);

    //Get all existing matches
    const stringMatches = fs.readFileSync(path.join(__dirname, "../Models/Matches.json"));
    const existingMatches = JSON.parse(stringMatches);

    //Iterate through every user who has liked someone
    for(i = 0; i < keys.length; i++) {

        var matches = [];
        var hasMatch = false;

        //Check if the given user already has matches
        if(existingMatches[keys[i]]) {

            //If yes, assign the user's matches to the empty array so they won't be overridden
            matches = existingMatches[keys[i]];

        }

        //Iterate through the likes of the given user
        for(j = 0; j < likes[keys[i]].length; j++) {

            //Begin new interation of second user
            for(k = 0; k < keys.length; k++) {

                //Iterate through every of the second user's likes
               for(l = 0; l < likes[keys[k]].length; l++) {
                
                //Check if any of the first users likes equal the current second user and if any of the
                //second user's likes equal the current first user
                if(likes[keys[i]][j].email == keys[k] && likes[keys[k]][l].email == keys[i]) {

                    //Make sure that the match has not already been added to the array of matches
                    for(h = 0; h < matches.length; h++) {

                        if(matches[h].email == likes[keys[i]][j].email) {
                            
                            hasMatch = true;

                        }

                    }

                    //If the match does not already exist add it to the array of matches
                    if(hasMatch == false) {

                        matches.push({name: likes[keys[i]][j].name, age: likes[keys[i]][j].age, email: likes[keys[i]][j].email});

                    }

                    hasMatch = false;
                
                    }

                }
                
            }

        }

        //Save all matches for the current first user
        dictionary[keys[i]] = matches;

    }

    //Save all matches to JSON files
    fs.writeFile(path.join(__dirname, "../Models/Matches.json"), JSON.stringify(dictionary), (err) => {

        if (err) {

            console.log(err);

        }

    });

    //Export dictionary of all matches
    return dictionary;

        
    } catch (err) {
        
        if (err) {

            console.log(err);

        }

    }

}

//Export match users function
module.exports = {

    matchUsers: matchUsers

};