var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('passport-local');
var mongoose = require('mongoose');
var db = mongoose.db;
var user = require('../dbModels/user');

passport.use(new passportLocal.Strategy(
    function (username, password, done){
        console.log(username, password);
        user.findOne({username: username}, function(err, user){
            if (err) return done(err);
            if (!user || user.password !== password){
                return done(null, null);
            }
            return done(null, user);
        });
    }
));

//lajlksjfdlk

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    user.findById(id, done);
});

router.get('/login1', function(req, res) {
    res.render('auth/login', { title: 'Please login.', message: 'wrong username or password' });
});

router.get('/login', function(req, res) {
    res.render('auth/login', { title: 'Please login.' });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/userHome',
    failureRedirect: '/auth/login1'
}));


router.get('/signup', function(req, res) {
    res.render('auth/signup', {
        titel: 'Sign Up'
    });
});


router.post('/signup', function(req, res){
    console.log('start');
    var email = req.param('email');
    var username = req.param('username');
    var password = req.param('password');
    var confirmPassword = req.param('confirmPassword');
    var firstName = req.param('firstName');
    var lastName = req.param('lastName');
    var errors = {};

    if (password !== confirmPassword) {
        errors.confirmPassword = {
            message: 'Passwords do not match.'
        };
    }
    if (Object.keys(errors).length > 0) {
        res.render('auth/signup', {
            titel: 'Sign Up',
            errors: errors
        });
    }

    var newUser = new user({
        email : email,
        username : username,
        password : password,
        name: {
            first: firstName,
            last: lastName
        }
    });

    newUser.save(function(err, user){
        if (err){
            console.error(err.message);
        } else {
           res.redirect('/');
        }
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/auth/login');
});



module.exports = router;