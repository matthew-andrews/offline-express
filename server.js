/**
 * Application Cache Controller.
 *
 * @author Matthew Andrews <matt@mattandre.ws>
 */

// External deps
var express = require('express');

// Internal deps
var defaults         = require('./lib/defaults');
var appcacheManifest = require('./lib/appcache.manifest');
var apiFallback      = require('./lib/api-fallback');
var iframe           = require('./lib/iframe');
var boot             = require('./lib/boot');

module.exports = function (options) {
	if (!options.bootCallback) {
		throw new Error("Need to provide boot callback");
	}
	options.cookie    = options.cookie    || 'up';
	options.namespace = options.namespace || 'offline';
	var app = express();

	// To support iOS6 pinned non-homepage - see #13
	// this should be swapped for the boot URL if one
	// is set (passed in through the cookie).
	//
	// For now only support the normal case where
	// we hijack the root URL if the cookie is set.
	app.use(boot({
		cookie: options.cookie,
		bootCallback: options.bootCallback
	}));

	// The appcache iframe
	app.use(iframe({
		namespace: options.namespace
	}));

	// The appcache manifest.
	app.use(appcacheManifest({
		namespace: options.namespace,
		api: options.api
	}));

	// The fallback - just a plain/text response
	app.use(apiFallback({
		namespace: options.namespace
	}));

	return app;
};