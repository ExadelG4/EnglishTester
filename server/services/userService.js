var user = require('../db/mongo').user;
function getAllUsers(){
	return user.find();
}
function addNewUser(email, pass){
	return user.add(email, pass);
}
function authenticate(email, pass){
	return user.authenticate(email, pass);
}

module.exports.getAllUsers = getAllUsers;
module.exports.addNewUser = addNewUser;
module.exports.authenticate = authenticate;

