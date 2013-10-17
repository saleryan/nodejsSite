var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    title: String,
    date: String,
    entry: String
});

postSchema.statics.len = function (callback) {
    console.log("*" + this.find().count({}));
    return this.find().count({});
};

postSchema.statics.recentPosts = function (no,max,callback) {
return this.find()
.sort('title')
.limit(max)
.skip(no)
.exec(callback);
};

module.exports = postSchema;