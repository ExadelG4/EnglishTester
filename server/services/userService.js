var mongo = require('../db/mongo');
function getAll(){
	return mongo.user.find(function (err, array) {
 		//if (err) return throw new Error(err);

		return array; 	 
	})
}
module.exports.getAll = getAll;