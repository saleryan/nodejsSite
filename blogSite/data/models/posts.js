var mongoose = require('mongoose');
var postSchema = require('../schemas/posts');
var posts = mongoose.model('posts', postSchema);
module.exports = posts;