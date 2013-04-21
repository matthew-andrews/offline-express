/**
 * IFRAME Hack to prevent caching masters
 *
 * @author Matt Andrews <matt@mattandre.ws>
 * @copyright The Financial Times
 */

// External deps
var express = require('express');
var readFile = require('fs').readFile;
var path = require('path');

// Js cache
var js;

function readJavascriptFile(fileName, callback) {
	if (js) {
		callback(null, js);
	} else {
		readFile(path.join(__dirname, fileName), 'utf-8', callback);
	}
}

module.exports = function(options) {
	var app = express();

	app.set('view engine', 'jade');
	app.set('views', __dirname);

	app.get('/' + options.namespace + '/iframe', function(req, res) {
		readJavascriptFile('client.min.js', function (err, data) {
			res.render('view', {
				namespace: options.namespace,
				js: data
			});
		});
	});
	return app;
};