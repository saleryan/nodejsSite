var user = require('../data/models/users');
var crypto = require('crypto-js');
var nodemailer = require("nodemailer");

exports.login = function (req, res) {
    res.render("login");
}

exports.forgotPassword = function (req, res,next) {
    user.findOne({ username: req.body.username }, function (err, found) {
        if (err) {
            return next(err);
        }
        if (found) {
            //generate a temp password
            var tempPassword = "9";
            var hashedPassword=crypto.SHA256(tempPassword).toString();
            user.update({ username:  found.username }, { '$set': { 'password': hashedPassword} }, function () {

                var smtpTransport = nodemailer.createTransport("SMTP", {
                    service: "Gmail",
                    auth: {
                        user: "saleryan@gmail.com",
                        pass: "Hardwar3"
                    }
                });

                var mailOptions = {
                    from: "support@myblog.com", // sender address
                    to: "saleryan@gmail.com", // list of receivers
                    subject: "Forgot Password", // Subject line
                    text: "Your new temp password is " + tempPassword // plaintext body
                    //  html: "<b>this is a test</b>" // html body
                }

                // send mail with defined transport object
                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.render('forgotPassword');
                        console.log("Message sent: " + response.message);
                    }
                    smtpTransport.close()
                    // if you don't want to use this transport object anymore, uncomment following line
                    //smtpTransport.close(); // shut down the connection pool, no more messages
                });

            });
        }
        else {
            res.send("user not found");
        }

    });





}
exports.loginPost = function (req, res,next) {
    user.findOne({ username: req.body.username, password: crypto.SHA256(req.body.password).toString() }, function (err, user) {
        if (err) {
            return next(err);
        }

        if (user) {

            req.session.user = { isAuthenticated: true, username: req.body.username }
            res.redirect("/index");
        }
        else {
            req.session.destroy(function () { });

            res.render('login', { error: { message: "incorrect username/password"} });
        }

    });



}

exports.logout = function (req, res) {
    if (req.session.user && req.session.user.isAuthenticated === true) {
        req.session.destroy(function () { });
      
    }
    res.redirect('/');

}
