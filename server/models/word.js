var fs = require('fs');

/*
============================================================
Create hash table of words found in the files
============================================================
*/

// Helper function for adding word to dictionary
function addWordToDict(word){
	if (!wordDictionary.hasOwnProperty(word)){
		wordDictionary[word] = 1;
	} else {
		wordDictionary[word] += 1;
	}
}

// Create array of file names
var files_array = fs.readdirSync('././sample_txtfiles');

// Use regular expressions to filter out hidden files
files_array = files_array.filter(function(filename){
	return !(/(^|\/)\.[^\/\.]/g).test(filename)
});

// Dictionary of all words
var wordDictionary = {};

// Loop through each file name in files_array and either put each new word into the dictionary
// or increment that word's count if it already exists in the dictionary
for (var i=0; i < files_array.length; i++){

	// for each file, put all characters in a string
	var string = fs.readFileSync('././sample_txtfiles/'+files_array[i]).toString();

	// initialize a word as an empty string
	var word = "";

	// Go through each character in string and use regular expressions to determine if
	// the character is alphabet, hypthen between two words, or apostrophe.  If so, append character to the "word" variable.
	// Only the LOWERCASE version of the character is appended (i.e., "Test", "test", and "TEST" will all count as the same word).
	for (var i=0; i < string.length; i++){

		// check for a hyphenated word - only include hyphen if it is in the middle of a word.
		if (string[i] == "-"){
			if ((word != "") && (/^[a-zA-Z]/.test(string[i+1]))) {
				word += string[i].toLowerCase();
			}
		// not a hyphenated word
		} else {
			// check if character is either an alphabet or apostrophe
			if ( /^[a-zA-Z']/.test(string[i]) ){
				word += string[i].toLowerCase();

				// If character is the last character in the file, add last word to dictionary or increment count.
				if (i == string.length - 1){
					addWordToDict(word);
				}

			} else {
				if (word != ""){
					addWordToDict(word);
					word = "";
				}
			}
		}
	}
}

module.exports = wordDictionary;