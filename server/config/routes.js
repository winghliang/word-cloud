var words = require('../controllers/words.js');

module.exports = function(app){
	app.get('/:word', function(req, res){
		words.get_counts(req, res);
	})
}