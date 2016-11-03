// wordDictionary is a hash table of the number of occurences of particular words in the text files
wordDictionary = require('../models/word.js')

// requestsDictionary is a hash table of the number of times a particular word was a parameter in a request
requestsDictionary = {};

module.exports = {

	get_counts: function(req, res){

		var inputted_word = req.params.word; 

		var result = {};

		// Add the number of occurences of the inputted word into the result
		if (wordDictionary.hasOwnProperty(inputted_word)){
			result['number_of_occurences'] = wordDictionary[inputted_word];
		} else {
			result['number_of_occurences'] = 0;
		}

		// Add the number of requests of the inputted word into the result
		if (requestsDictionary.hasOwnProperty(inputted_word)){
			requestsDictionary[inputted_word] += 1;
		} else {
			requestsDictionary[inputted_word] = 1;
		}
		result['number_of_requests'] = requestsDictionary[inputted_word];

		// Return the result as a JSON object
		res.json(result);
	}
}