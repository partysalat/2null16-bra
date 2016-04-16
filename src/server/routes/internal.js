'use strict';
var routes = [{
  method: 'GET',
  path: '/internal/status',
  config: {
    handler: require('../handlers/statusHandler.js')
  }
},
  {
    method: 'GET',
    path: '/internal/assets/{filename*}',
    handler: {
      directory: {
        path: __dirname + '/../../../target/assets',
        redirectToSlash: true
      }
    }
  },
  {
    method: 'GET',
    path: '/internal/images/{filename*}',
    handler: {
      directory: {
        path: __dirname + "/../../../../../braimages",
        redirectToSlash: true
      }
    }
  },
  {
    method: 'GET',
    path: '/internal/version',
    config: {
      handler: require('../handlers/versionHandler.js')
    }
  }, {
    method: 'GET',
    path: '/internal/sync/drinks',
    config: {
      handler: require('../handlers/versionHandler.js').syncDrinks
    }
  }, {
    method: 'GET',
    path: '/internal/sync/user',
    config: {
      handler: require('../handlers/versionHandler.js').sync
    }
  }, {
    method: 'GET',
    path: '/internal/sync/news',
    config: {
      handler: require('../handlers/versionHandler.js').syncNews
    }
  }
];

module.exports = routes;