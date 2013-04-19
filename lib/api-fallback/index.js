/**
 * Fallback for api requests
 *
 * @author Matt Andrews <matt@mattandre.ws>
 */

// External deps
var express = require('express');

module.exports = function(options) {
	var app = express();

	var body = 'OFFLINE';

	app.get('/' + options.namespace + '/api-fallback', function(req, res) {
		res.setHeader('Content-Type', 'text/plain');
		res.setHeader('Content-Length', body.length);
		res.end(body);
	});
	return app;
};