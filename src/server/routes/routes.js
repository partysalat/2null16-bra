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
  path: '/internal/version',
  config: {
    handler: require('../handlers/versionHandler.js')
  }
},{
    method: 'GET',
    path: '/internal/sync/drinks',
    config: {
      handler: require('../handlers/versionHandler.js').syncDrinks
    }
  },{
    method: 'GET',
    path: '/internal/sync',
    config: {
      handler: require('../handlers/versionHandler.js').sync
    }
  },
  {
    method: 'GET',
    path: '/api/drinks/cocktails',
    config: {
      handler: require('../handlers/drinkHandler.js').getCocktails
    }
  },{
    method: 'GET',
    path: '/api/users',
    config: {
      handler: require('../handlers/userHandler.js').getUsers
    }
  },
  {
    method: 'POST',
    path: '/api/drinks',
    config: {
      handler: require('../handlers/drinkHandler.js').save
    }
  }

];


module.exports = routes;