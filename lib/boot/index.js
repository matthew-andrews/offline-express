/**
 * The boot script - used the load up the
 * app from the app cache.
 *
 * The responsibility of this module is
 * purely to decide whether or not to hijack
 * the root URL.
 *
 * If it decides to hijack the root URL it
 * will delegate the responsibility of
 * returning the bootstrap to the function
 * passed in within options.
 *
 * Otherwise it continues to the next layer
 * of middleware.
 *
 * @author Matt Andrews <matt@mattandre.ws>
 * @copyright The Financial Times
 */

/**
 * External deps
 */

var express = require('express');

module.exports = function(options) {
  var app = express();
  app.use(express.cookieParser());

  app.set('view engine', 'jade');
  app.set('views', __dirname);

  app.get('/', function(req, res, next) {
    if (req.cookies[options.cookie]) {
      options.bootCallback.apply(this, arguments);
    } else {
      next();
    }
  });
  return app;
};
