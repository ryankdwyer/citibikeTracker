var express = require('express'),
    router = express.Router(),
    path = require('path');

var rootPath = path.join(__dirname, '..', '..');
var bower = path.join(rootPath, 'bower_components');
var browser = path.join(rootPath, 'browser');
var publicRoute = path.join(rootPath, 'public');

router.use(express.static(bower));
router.use(express.static(browser));
router.use(express.static(publicRoute));

module.exports = router;
