'use strict';
var User = require("./../models/User"),
  Drink = require("./../models/Drink"),
  News = require("./../models/News"),
  sequelize = require("./../db/sequelize");
var PAGE_SIZE = 20;
var _ = require("lodash");
module.exports.save = function (request, reply) {
  var initialData = request.payload;
  var transformedData = _.map(initialData.users, function (userId) {
    return {
      drinkId: initialData.drink,
      userId: userId
    };
  });
  News.bulkCreate(transformedData).then(function () {
    reply().code(204);
  }).catch(function (err) {
    console.error(err);
    reply(err);
  });
};


module.exports.getDrink = function (request, reply) {
  Drink.findAll({
    where: {
      type: Drink.DRINK_TYPES[request.params.type.toUpperCase()]
    }
  }).then(function (drinks) {
    reply({drinks: drinks});
  });
};


module.exports.getNews = function (request, reply) {
  var page = request.params.page;

  News.findAll({
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    include: [User, Drink]
  }).then(reply).catch(reply);
};

module.exports.saveDrink = function(request,reply){
  var name = request.payload.name;
  var type = request.params.type.toUpperCase();
  Drink.create({
    name:name,
    type:type
  }).then(reply).catch(function(err){
    console.log(err);
    reply(err);
  });
};

module.exports.getNewsPerUser = function (request, reply) {
  News.findAll({
    attributes: [[sequelize.get().fn('count', sequelize.get().col('drinkId')), "drinkCount"]],
    group: ["userId"],
    include: [User]
  }).then(reply).catch(function (err) {
    console.error(err);
    reply(err);
  });
};