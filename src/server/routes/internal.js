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
        path: process.env.HOME + "/braimages",
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
      handler: require('../handlers/versionHandler.js').syncDrinks,
      auth: 'simple'
    }
  }, {
    method: 'GET',
    path: '/internal/sync/user',
    config: {
      handler: require('../handlers/versionHandler.js').sync,
      auth: 'simple'
    }
  }, {
    method: 'GET',
    path: '/internal/sync/news',
    config: {
      handler: require('../handlers/versionHandler.js').syncNews,
      auth: 'simple'
    }
  },
  {
    method: 'GET',
    path: '/internal/install',
    config: {
      handler: require('../handlers/versionHandler.js').install,
      auth: 'simple'
    }
  },
  {
    method: 'GET',
    path: '/internal/sync/achievements',
    config: {
      handler: require('../handlers/versionHandler.js').syncAchievements,
      auth: 'simple'
    }
  }
];

module.exports = routes;