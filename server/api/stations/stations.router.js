var Station = require('./stations.model.js').Station;
var router = require('express').Router();
var Citibike = require("../../../citibike/lib/citibike.js");
var citibike = new Citibike();

router.get('/stations', function(req, res, next){
	Station.find()
	.then(function(stations){
		// console.log('got the stations');
		res.send(stations);
	})
	.then(null, next);
});

router.get('/update', function (req, res, next) {
    console.log('hitting update route');
    var updates,
        updatesResults,
        updatesObj= {};
    citibike.getUpdates(null, function (data) {
        updatesResults = data.results;
        console.log('update results', updatesResults);
        updatesResults.forEach(function(el){
            updatesObj[el.id] = [el.availableBikes, el.availableDocks, data.lastUpdate];
        });
        res.send(updatesObj);
    });
});

module.exports = router;