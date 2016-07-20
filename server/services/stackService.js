var stack = require('../db/mongo').stack;
function getAllStack(){
	return stack.find();
}

module.exports.getAllStack = getAllStack;