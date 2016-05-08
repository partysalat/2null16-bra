'use strict';
var User = require("./../models/User"),
  News = require("./../models/News"),
  Drink = require("./../models/Drink"),
  utils = require("./../models/utils"),
  _ = require("lodash");
var CACHE_TIMEOUT = 2000;
module.exports.getUsers = function (request, reply) {
  User.findAll({raw:true}).then(utils.convertRawToJson).then(function (users) {
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
var getCachedNewsStats = _.throttle(function(){
  return News.getStats();
},CACHE_TIMEOUT);

module.exports.getBestlist = function (request, reply) {

  getCachedNewsStats().then(function (list) {
    reply({bestlist: list});
  }).catch(function (err) {
    console.error(err);
    reply(err);
  });

};
module.exports.getBestlistAsCSV = function (request, reply) {

  News.findAll({
    where:{
      type: News.NEWS_TYPES.DRINK
    },
    include: [User, Drink]
  }).then(function (list) {
    var header = ["Name", "Getränk", "Anzahl", "Uhrzeit"];
    var result = _(list)
      .map(function (item) {
        return [item.user.dataValues.name, item.drink.dataValues.name,item.cardinality || "FOOO", item.createdAt];
      })
      .filter(_.identity)
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

module.exports.getAchievements = function(request,reply){
  getCachedAchievements().then(function(list){
    reply(list);
  }).catch(function (err) {
    console.error(err);
    reply(err);
  });
};

var getCachedAchievements = _.throttle(function(){
  return News.getAchievements();
},CACHE_TIMEOUT);