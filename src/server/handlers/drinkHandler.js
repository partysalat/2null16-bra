'use strict';
var cocktails = require("./../mock/cocktails.json");
var User = require("./../models/User"),
  Drink  = require("./../models/Drink");
module.exports.save = function (request, reply) {
  reply({status:"ok"})
};


module.exports.getCocktails = function(request,reply){
  Drink.findAll({
    where:{
      type:Drink.DRINK_TYPES.COCKTAIL
    }
  }).then(function(drinks){
    reply({drinks:drinks})
  });
};
