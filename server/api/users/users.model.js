var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');

var User;

var userSchema = new Schema({
	_id: {type: String, unique: true, 'default': shortid.generate()},
	email: {type: String, unique: true, required: true},
	name: {type: String, required: true},
	home: {type: Array, required: true}, 
	password: {type: String, required: true},
	google: {
		id: {type: String},
		name: {type: String},
		email: {type: String},
		token: {type: String}
	}
});

User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};