
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var dashboard = require('./routes/login');

var http = require('http');
var path = require('path');

var dbURL = 'mongodb://localhost/test';
var db = require('mongoose').connect(dbURL);
//var expressValidator = require('express-validator'); 
var app = express();
var notFound = function (request, response) {
    response.statusCode = 404;
    response.description = "Not found";
    response.render('404');
};



var errorHandler = function (err, request, response, send) {

    response.render('error', { description: err.stack });
};


var authenticator = function (request, response, next) {
    console.log("authenticating");
    if (request.session.user && request.session.user.isAuthenticated === true) {

        next();
    }
    else {

        response.redirect("/login");
    }

}
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
//app.use(expressValidator);
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({
    cookie: {
        key:'whynode',
        maxAge: 60*10000
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

//is there any valid route
app.use(app.router);
//if not check these other routes
app.use(notFound);



app.use(errorHandler);
console.log(__dirname);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/login', dashboard.login);
app.get('/logout', dashboard.logout);
app.post('/login', dashboard.loginPost);

app.post('/forgotpassword', dashboard.forgotPassword);

app.get('/AddEntry',authenticator, user.addEntry);
app.post('/AddEntryPost',authenticator, user.addEntryPost);
app.get('/SignUp', user.signUp);
app.post('/create', user.create);
app.get('/ChangePassword', authenticator, user.changePassword);
app.post('/ChangePasswordPost', authenticator, user.changePasswordPost);


app.get('/index', authenticator, routes.index);
app.get('/', authenticator, routes.index);
app.get('/index?page', authenticator, routes.index);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
