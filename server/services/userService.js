var mongo = require('../db/mongo');
function getAllUsers(){
	return mongo.user.find();
}
function addNewUser(email, pass, name){
	return mongo.user.add(email, pass, name);
}
function authenticate(email, pass){
	return mongo.user.authenticate(email, pass);
}

module.exports.getAllUsers = getAllUsers;
module.exports.addNewUser = addNewUser;
module.exports.authenticate = authenticate;