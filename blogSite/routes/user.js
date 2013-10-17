
/*
* GET users listing.
*/
//var posts = require('../public/javascripts/posts.js');
var post = require('../data/models/posts');
var user = require('../data/models/users');
var crypto = require('crypto-js');
exports.addEntry = function (req, res) {
    res.render("AddEntry");
}

exports.signUp = function (req, res) {
    res.render('SignUp');
}
exports.create = function (req, res, next) {

    var hashedPassword = crypto.SHA256(req.body.password).toString();
    var newUser = { username: req.body.username, password: hashedPassword };

    user.create(newUser, function (err) {
        if (err) {
            res.render('signup', { error: { message: err.err} });
           
        }
        else res.redirect("/index");
    });
}

exports.changePassword = function (req, res) {
    res.render('ChangePassword');
}


exports.changePasswordPost = function (req, res,next) {
    var hashedOldPassword = crypto.SHA256(req.body.oldPassword).toString();
    user.findOne({ username: req.session.user.username, password: hashedOldPassword }, function (err, found) {
        if (err) {
            return next(err);
        }
        if (found) {
            var hashedPassword = crypto.SHA256(req.body.newPassword).toString();
            user.update({ username: found.username }, { '$set': { 'password': hashedPassword} }, function () {
                res.redirect('/');
            });
        }
        else {

            res.render('ChangePassword', { error:{message: 'Your session has timed out / user not found/ old password is incorrect' }});
        }
    });
}

exports.addEntryPost = function (req, res,next) {
    //var title = req.body.title;
    //var entry = req.body.entry;
    post.create(req.body, function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/index");
    });
    //posts.addPost(title, entry);

}

