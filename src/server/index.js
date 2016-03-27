/*jslint node: true*/
"use strict";

var
  server,
  hapi = require('hapi'),
  logger = console,
  routes = require('hapi-auto-routes');


function create(connectionSettings, callback) {

// init and configure server
  server = new hapi.Server();
  server.connection(connectionSettings);


  
  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: require('./handlers/indexHandler.js'),
    }
  });
  
  server.register([
    
    require('inert'),
    require('vision')
    ], function (pluginInitializationErrors) {

    if (pluginInitializationErrors) {
      logger.error('2null16-bra failed to start: ', pluginInitializationErrors);
      callback(pluginInitializationErrors);
    }
    routes.bind(server).register({
      pattern: __dirname + '/routes/*.js'
    });
    
    server.views({
      engines: {
        jade: require('jade')
      },
      path: __dirname + '/views'
    });
    
    callback(null, server);
  });


  return server;
}

module.exports.create = create;