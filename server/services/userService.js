var user = require('../db/mongo').user;
function getAllUsers(){
	return user.find();
}

function addNewUser(email, pass, name){
	return user.add(email, pass, name);}

function addNewUser(email, pass){
	return user.add(email, pass);

}
function addNewUser2(info){
	return user.save(info);
}
function authenticate(email, pass){
	return user.authenticate(email, pass);
}
function removeCollection(){
	return user.remove();
}
module.exports.getAllUsers = getAllUsers;
module.exports.addNewUser = addNewUser;
module.exports.authenticate = authenticate;
module.exports.removeCollection = removeCollection;
module.exports.addNewUser2 = addNewUser2;
