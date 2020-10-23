const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    name: String,
    age: Number,
    gender: String,
    preferredGender: String,
    userInterests: [String],
    image: { imgName: String, data: Buffer, contentType: String},
    role: String

});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;