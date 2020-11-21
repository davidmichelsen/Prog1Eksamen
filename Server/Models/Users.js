const { json } = require("body-parser");
const fs = require("fs");
const path = require("path");

try {

    const jsonString = fs.readFileSync(path.join(__dirname, "Users.json"))
    const users = JSON.parse(jsonString);

    module.exports = users;

} catch(error) {

    console.log(error);
    return

}




