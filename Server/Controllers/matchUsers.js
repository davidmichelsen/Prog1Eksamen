const fs = require("fs");
const path = require("path");
const dictionary = {};

function matchUsers() {

    try {

    const string = fs.readFileSync(path.join(__dirname, "../Models/Likes.json"));
    const likes = JSON.parse(string);
    const keys = Object.keys(likes);

    const stringMatches = fs.readFileSync(path.join(__dirname, "../Models/Matches.json"));
    const existingMatches = JSON.parse(stringMatches);

    for(i = 0; i < keys.length; i++) {

        var matches = [];
        var hasMatch = false;

        if(existingMatches[keys[i]]) {

            matches = existingMatches[keys[i]];

        }

        for(j = 0; j < likes[keys[i]].length; j++) {

            for(k = 0; k < keys.length; k++) {

               for(l = 0; l < likes[keys[k]].length; l++) {
                
                if(likes[keys[i]][j].email == keys[k] && likes[keys[k]][l].email == keys[i]) {

                    for(h = 0; h < matches.length; h++) {

                        if(matches[h].email == likes[keys[i]][j].email) {
                            
                            hasMatch = true;

                        }

                    }

                    if(hasMatch == false) {

                        matches.push({name: likes[keys[i]][j].name, age: likes[keys[i]][j].age, email: likes[keys[i]][j].email});

                    }

                    hasMatch = false;
                
                    }

                }
                
            }

        }

        dictionary[keys[i]] = matches;

    }

    fs.writeFile(path.join(__dirname, "../Models/Matches.json"), JSON.stringify(dictionary), (err) => {

        if (err) {

            console.log(err);

        }

    });

    return dictionary;

        
    } catch (err) {
        
        if (err) {

            console.log(err);

        }

    }

}

module.exports = {

    matchUsers: matchUsers

};

//matchUsers()