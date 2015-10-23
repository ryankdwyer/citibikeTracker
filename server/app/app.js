var app = require('express')();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');

app.listen(3000, function () {
    console.log('Patiently listening on port 3000');
});

app.use(session({
    secret: 'this is the secret string'
}));

app.use('/', function (req, res, next) {
    // console.log(req.session);
    next();
});

app.use(passport.initialize());

app.use(passport.session());

app.use(require('./statics.js'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', function (req, res, next) {
    res.sendFile(indexPath);
});

app.use('/api', require('../api/stations/stations.router'));
app.use('/api', require('../api/users/users.router'));

app.use(require('./error.js'));
