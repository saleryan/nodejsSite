var mongoose = require('mongoose');
var userSchema = require('../schemas/users');
var users = mongoose.model('users', userSchema);
module.exports = users;