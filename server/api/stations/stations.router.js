var Station = require('./stations.model.js').Station;
var router = require('express').Router();
var Citibike = require('citibike');
var citibike = new Citibike();

console.log('Citibike module, ', citibike);

router.get('/stations', function(req, res, next){
	Station.find()
	.then(function(stations){
		// console.log('got the stations');
		res.send(stations);
	})
	.then(null, next);
});

router.get('/update', function (req, res, next) {
  var updates,
      updatesResults,
      updatesObj= {};
    citibike.getUpdates(null, function (data) {
        updatesResults = data.results;
        updatesResults.forEach(function(el){
          updatesObj[el.id] = [el.availableBikes, el.availableDocks, data.lastUpdate];
        });
        res.send(updatesObj);
    });
});

module.exports = router;