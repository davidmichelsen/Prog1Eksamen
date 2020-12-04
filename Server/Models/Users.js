//Import packages
const fs = require("fs");
const path = require("path");

//Using try/catch exception to prevent unhandled errors
try {

    const jsonString = fs.readFileSync(path.join(__dirname, "Users.json"))
    const users = JSON.parse(jsonString);

    //Export found users
    module.exports = users;

} catch(error) {

    console.log(error);
    return

}




