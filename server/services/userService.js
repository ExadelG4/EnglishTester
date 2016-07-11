var user = require('../db/mongo').user;
function getAllUsers(){
	return user.find();
}
function getUser(data){
	return user.findOne(data);
}
function addUser(data){
	return user.save(data);
}
module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.addUser = addUser;