/**
 * The boot script - used the load up the app from the app cache
 *
 * @author Matt Andrews <matt@mattandre.ws>
 * @copyright The Financial Times
 */

// External deps
var express = require('express');

module.exports = function(options) {
	var app = express();
	app.use(express.cookieParser());

	app.set('view engine', 'jade');
	app.set('views', __dirname);

	app.get('/', function(req, res, next) {
		if (req.cookies[options.cookie]) {
			res.render('view');
		} else {
			next();
		}
	});
	return app;
};