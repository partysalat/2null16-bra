'use strict';
var User = require("./../models/User"),
  News = require("./../models/News"),
  sequelize = require("./../db/sequelize"),
  _ = require("lodash"),
  Drink = require("./../models/Drink");

module.exports.getUsers = function (request, reply) {
  User.findAll().then(function (users) {
    reply({users: users});
  }).catch(reply);
};
module.exports.saveUser = function (request, reply) {
  var name = request.payload.name;
  User.create({
    name: name
  }).then(reply).catch(function (error) {
    console.log(error);
    reply(error);
  });
};

module.exports.getBestlist = function (request, reply) {

  findBestlist().then(function (list) {
    reply({bestlist: list});
  }).catch(function (err) {
    console.error(err);
    reply(err);
  });

};
module.exports.getBestlistAsCSV = function (request, reply) {

  findBestlist().then(function (list) {
    var header = ["Trinker", "Gesamtanzahl", "Cocktails", "Bier", "Shots", "Kaffee"];

    var result = _(list)
      .map(function (item) {
        return [item.user.name, item.dataValues.drinkCount, item.dataValues.cocktailCount, item.dataValues.beerCount, item.dataValues.shotCount, item.dataValues.coffeeCount];
      })
      .map(function(item){
        return item.join(",");
      })
      .value();
    reply([header].concat(result).join("\n")).type("text/csv");
  }).catch(function (err) {
    console.error(err);
    reply(err);
  });

};

function findBestlist() {
  return News.findAll({
    where: {type: News.NEWS_TYPES.DRINK},
    include: [
      User,
      {model: Drink, attributes: []}
    ],
    attributes: [
      [sequelize.get().fn('count', sequelize.get().col('drinkId')), "drinkCount"],
      [sequelize.get().fn('count', sequelize.get().literal('CASE WHEN drink.type="BEER" THEN 1 END')), "beerCount"],
      [sequelize.get().fn('count', sequelize.get().literal('CASE WHEN drink.type="COCKTAIL" THEN 1 END')), "cocktailCount"],
      [sequelize.get().fn('count', sequelize.get().literal('CASE WHEN drink.type="SHOT" THEN 1 END')), "shotCount"],
      [sequelize.get().fn('count', sequelize.get().literal('CASE WHEN drink.type="COFFEE" THEN 1 END')), "coffeeCount"],
    ],
    group: ["userId"],
    order: [[sequelize.get().col('drinkCount'), 'DESC']]
  });
}