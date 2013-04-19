/**
 * Pulls in a single javascript file and
 * a single css file and returns a json
 * encoded object containing both.
 *
 * Loading of the files should be done in
 * a non-blocking way so it doesn't matter
 * how fast or slow the each files loads
 * and they can come back in any order.
 *
 * @author Matt Andrews <matt@mattandre.ws>
 * @copyright The Financial Times
 */

// External deps
var express = require('express');
var readFile = require('fs').readFile;

// Internal vars
var cache;
var filesToRead = 0;

/**
 * Reads a single resource
 *
 * @param  {string}   id       Either js or css
 * @param  {string}   fileName The file name
 * @param  {Function} callback Called once when all files read
 * @private
 * @return void
 */
function readResourceFile(id, fileName, callback) {
	readFile(fileName, 'utf-8', function(err, data) {
		if (err) {
			filesToRead = 0;
			callback(err);
		}
		cache[id] = data;
		if (--filesToRead === 0) {
			callback(null, cache);
		}
	});
}

/**
 * Gets the resources, either from
 * an internal memory cache or by
 * reading them directly from file
 *
 * @param  {Object}   options  Objects with keys js and css, pointing to the relevant file.
 * @param  {Function} callback Called with arguments err and object with populated js and css keys.
 * @private
 * @return void
 */
function readResources(options, callback) {
	if (cache) {
		callback(null, cache);
		return;
	}
	cache = {};
	for (var id in options) {
		filesToRead++;
		readResourceFile(id, options[id], callback);
	}
}

module.exports = function(options) {
	var app = express();

	app.get('/' + options.namespace + '/resources.json', function(req, res) {
		readResources({
			css: options.css,
			js: options.js
		}, function (err, resources) {
			if (err) {
				throw err;
			}
			res.json(resources);
			res.end();
		});
	});
	return app;
};