/*jslint node: true*/
"use strict";

var
  logger = console,
  Hoek = require('hoek');

// init
// init and configure server
process.title = "2null16-bra";
require('./src/server').create({
  port: 1337,
  routes: {
    state: {
      failAction: 'log'
    }
  }
},function(err,server){
  if(err){
    logger.error('2null16-bra failed to start: ', err);
    throw err;
  }
  server.start(function (startupError) {
    Hoek.assert(!startupError, startupError);
    logger.info('2null16-bra running at: ', server.info.uri);

    if (process.send) {
      process.send('server_started');
    }
  });
});
