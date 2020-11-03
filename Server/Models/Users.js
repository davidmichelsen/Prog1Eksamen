const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    email: String,
    password: String,
    name: String,
    age: Number,
    gender: String,
    preferredGender: String,
    userInterests: [String],
    image: Object,
    role: String

});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;