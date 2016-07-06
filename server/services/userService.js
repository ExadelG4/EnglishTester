var mongo = require('../db/mongo');
function printAllUsers(){
	mongo.user.find(function (err, array) {
 	 if (err) return console.error(err);
 	 console.log(array);
	})
}
module.exports.print = printAllUsers;