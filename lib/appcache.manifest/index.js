/**
 * Responsible for dealing with appcache manifest
 * and its various header quirks.
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

  app.get('/' + options.namespace + '/appcache.manifest', function(req, res) {

    var manifest = "CACHE MANIFEST" +
      "\n" + "# v1" +
      "\n" + "" +
      "\n" + "FALLBACK:" +
      (options.api ? "\n" + "/" + options.api + " /" + options.namespace + "/api-fallback" : "") +
      "\n" + "/ /" +
      "\n" + "" +
      "\n" + "NETWORK:" +
      "\n" + "*";

    // TODO - Return different headers for IE10
    // so that it know to store the manifest.
    res.setHeader("Content-Type", "text/cache-manifest");
    res.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate, private");
    res.setHeader("Content-Length", manifest.length);
    res.end(manifest);
  });
  return app;
};
