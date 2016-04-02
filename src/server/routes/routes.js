'use strict';
var Joi = require("joi");
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
  },
  {
    method: 'GET',
    path: '/api/drinks/{type}',
    config: {
      handler: require('../handlers/drinkHandler.js').getDrink,
      validate:{
        params:{
          type:Joi.any().valid("cocktail","beer","coffee","shot")
        }
      }
    }
  },{
    method: 'POST',
    path: '/api/drinks/{type}',
    config: {
      handler: require('../handlers/drinkHandler.js').saveDrink,
      validate:{
        params:{
          type:Joi.any().valid("cocktail","beer","coffee","shot")
        },
        payload:{
          name:Joi.string()
        }
      }
    }
  }, {
    method: 'GET',
    path: '/api/user',
    config: {
      handler: require('../handlers/userHandler.js').getUsers
    }
  },
  {
    method: 'POST',
    path: '/api/user',
    config: {
      handler: require('../handlers/userHandler.js').saveUser
    }
  },
  {
    method: 'GET',
    path: '/api/news/{page}',
    config: {
      handler: require('../handlers/drinkHandler').getNews,
      validate:{
        params:{
          page:Joi.number().integer()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/news/user',
    config: {
      handler: require('../handlers/drinkHandler').getNewsPerUser
    }
  },
  {
    method: 'POST',
    path: '/api/drinks',
    config: {
      handler: require('../handlers/drinkHandler.js').save,
      validate:{
        payload:{
          users:Joi.array(),
          drink:Joi.number().integer()
        }
      }
    }

  }

];


module.exports = routes;