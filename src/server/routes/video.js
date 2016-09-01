'use strict';
var routes = [
  {
    method: 'GET',
    path: '/live/stream',
    config: {
      handler: require('../handlers/liveStreamHandler.js').stream
    }
  },
  {
    method: 'GET',
    path: '/live/stream/start',
    config: {
      handler: require('../handlers/liveStreamHandler.js').start
    }
  }, {
    method: 'GET',
    path: '/live/stream/stop',
    config: {
      handler: require('../handlers/liveStreamHandler.js').stop
    }
  }

];


module.exports = routes;