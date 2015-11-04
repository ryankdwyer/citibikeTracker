var mongoose = require('mongoose');
var path = require('path');
var DATABASE_URI = require(path.join(__dirname, '../../env')).DATABASE_URI;

mongoose.connect(DATABASE_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
var Schema = mongoose.Schema;

var Station;

var stationSchema = new Schema ({
	stationId: {type: Number, required: true},
	status: {type: String, required: true},
	latitude:{type: Number, required: true},
	longitude: {type: Number, required: true},
	label: {type: String, required: true},
	stationAddress: {type: String},
	availableBikes: {type: Number, required: true},
	avaialbleDocks: {type: Number, required: true},
	nearbyStations: [{ 
		stationId: {type: Number, required: true}, 
		distance: {type: Number, required: true}
	}],
	lastUpdate: {type: Number}
});

Station = mongoose.model('Station', stationSchema, 'station');

module.exports = {
	Station: Station
};
