'use strict';
var Joi = require("joi");
var routes = [
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
      handler: require('../handlers/newsHandler').getNews,
      validate:{
        params:{
          page:Joi.number().integer()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/news/item/{newsId}',
    config: {
      handler: require('../handlers/newsHandler').remove,
      validate:{
        params:{
          newsId:Joi.number().integer()
        }
      }
    }
  },
  
  {
    method: 'POST',
    path: '/api/drinks',
    config: {
      handler: require('../handlers/newsHandler').save,
      validate:{
        payload:{
          users:Joi.array(),
          drink:Joi.number().integer()
        }
      }
    }

  },
  {
    method: 'PUT',
    path: '/api/keeper/{keeper}',
    config: {
      handler: require('../handlers/barkeeperHandler.js').notify,
      validate:{
        params:{
          keeper:Joi.string(),
          status:Joi.any().valid("online","offline")
        }
      }

    }
  },
 {
    method: 'POST',
    path: '/api/photo',
    config: {
      handler: require('../handlers/barkeeperHandler.js').takephoto,
      validate:{
        params:{
          imagePath:Joi.string(),
          keeper:Joi.string()
        }
      }

    }
  },
  {
    method: 'GET',
    path: '/api/user/bestlist',
    config: {
      handler: require('../handlers/userHandler').getBestlist,
      validate:{
        params:{
          imagePath:Joi.string(),
          keeper:Joi.string()
        }
      }

    }
  },
  {
    method: 'GET',
    path: '/api/user/bestlist/csv',
    config: {
      handler: require('../handlers/userHandler').getBestlistAsCSV,
      validate:{
        params:{
          imagePath:Joi.string(),
          keeper:Joi.string()
        }
      }

    }
  }

];


module.exports = routes;