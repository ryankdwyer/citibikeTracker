'use strict';
var Promise = require('bluebird');
var path = require('path');

var DATABASE_URI = require(path.join(__dirname, '../server/env')).DATABASE_URI;
var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI).connection;

// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.

var startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', reject);
});

module.exports = startDbPromise;