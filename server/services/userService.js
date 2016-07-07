var mongo = require('../db/mongo');
function getAllUsers(){
	return mongo.user.find();
}


module.exports.getAllUsers = getAllUsers;