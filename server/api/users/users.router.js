var User = require('./users.model.js').User;
var router = require('express').Router();
var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.post('/login', function (req, res, next) {
    User.findOne(req.body)
        .then(function (user) {
            if (user) {
                console.log('Signing ' + user.name + ' in...');
                req.session.user = user._id;
                console.log(req.session.user);
                res.json(user);
            } else {
                console.log('User does not exist');
                next(err);
            }
        })
        .then(null, next);
});

router.post('/register', function (req, res, next) {
    User.create(req.body)
        .then(function (user) {
            if (user) {
                console.log('Successfully created: ', user);
                res.status(201).json(user);
            }
        })
        .then(null, next);
});

router.post('/logout', function (req, res, next) {
    var deletedUser = req.session;
    delete req.session;
    console.log('logging out...', deletedUser);
    res.json(200);
});


passport.use(
    new GoogleStrategy({
            clientID: '606367403351-afkolf5dojahrideslkv1v09umnnrsai.apps.googleusercontent.com',
            clientSecret: 'L0V1V4fZgUDwRRjbNLIYXx0U',
            callbackURL: 'http://localhost:3000/api/auth/google/callback'
        },
        function (token, refreshToken, profile, done) {
            console.log(profile);
            User.findOne({
                    'google.id': profile.id
                })
                .then(function (user) {
                    if (user) {
                        done(null, user);
                    } else {
                        User.create({
                                email: profile.emails[0].value,
                                google: {
                                    id: profile.id,
                                    name: profile.name.givenName,
                                    email: profile.emails[0].value,
                                    token: token
                                }
                            })
                            .then(function (user) {
                                done(null, user);
                            });
                    }
                });
        })
);

//google authentication and login
router.get('/auth/google', passport.authenticate('google', {
    scope: 'email'
}));

// handle the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

module.exports = router;
