var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
        type: String
    }

});



module.exports = userSchema;