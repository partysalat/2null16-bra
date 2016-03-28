'use strict';
var User = require("./../models/User"),
  Drink  = require("./../models/Drink"),
  News  = require("./../models/News"),
  sequelize = require("./../db/sequelize");
var _ = require("lodash");
module.exports.save = function (request, reply) {
  var initialData = request.payload;
  var transformedData = _.map(initialData.users,function(userId){
    return {
      drinkId:initialData.drink,
      userId:userId
    };
  });
  News.bulkCreate(transformedData).then(function(){
    reply().code(204);
  }).catch(function(err){
    console.error(err);
    reply(err);
  });
};


module.exports.getCocktails = function(request,reply){
  Drink.findAll({
    where:{
      type:Drink.DRINK_TYPES.COCKTAIL
    }
  }).then(function(drinks){
    reply({drinks:drinks});
  });
};


module.exports.getNews = function(request,reply){
  News.findAll({
    include: [User]
  }).then(reply).catch(reply);
};
module.exports.getNewsPerUser = function(request,reply){
  News.findAll({
    attributes: [[sequelize.get().fn('count', sequelize.get().col('drinkId')),"drinkCount"]],
    group: ["userId"],
    include: [User]
  }).then(reply).catch(function(err){
    console.error(err);
    reply(err);
  });
};