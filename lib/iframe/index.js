/**
 * IFRAME Hack to prevent caching masters
 *
 * @author Matt Andrews <matt@mattandre.ws>
 */

// External deps
var express = require('express');
var readFile = require('fs').readFile;

module.exports = function(options) {
	var app = express();

	app.set('view engine', 'jade');
	app.set('views', __dirname);

	// TODO - Need to find some way of exposing
	// and including the compiled client javascript
	// in the jade template.
	app.get('/' + options.namespace + '/iframe', function(req, res) {
		res.render('view', {
			namespace: options.namespace
		});
	});
	return app;
};