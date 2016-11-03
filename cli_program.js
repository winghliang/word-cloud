var http = require('http');

var prompt = require("prompt");

prompt.start();

prompt.get({
	properties: {
		word: {
			description: "Please enter a word"
		}
	}
}, function (err, result) { 

	var options = {
		host: 'localhost',
		port: 8080,
		path: '/'+result.word.toLowerCase()
	};

	callback = function(response) {

		response.on('data', function (data) {
			var jsonObject = JSON.parse(data);

			console.log('1.  The total number of requests in which the word "'+result.word.toLowerCase()+'" was a parameter is ', jsonObject['number_of_requests']);
			console.log('2.  The total number of occurences of the word "'+result.word.toLowerCase()+'" in the text files is ', jsonObject['number_of_occurences']);			
		});

	};

	http.get(options, callback);

});
