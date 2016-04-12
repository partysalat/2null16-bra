'use strict';
var User = require("./../models/User"),
  Drink = require("./../models/Drink"),
  News = require("./../models/News"),
 socket = require("./../socket"),

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
    News.findAll({
      limit: transformedData.length,
      offset: 0,
      include: [User, Drink],
      order: [['updatedAt', 'DESC']]
    }).then(function(data){
      socket.addNews(data);
    });

    reply().code(204);
  }).catch(function (err) {
    console.error(err);
    reply(err);
  });
};




module.exports.getNews = function (request, reply) {
  var page = request.params.page;

  News.findAll({
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    include: [User, Drink],
    order: [['updatedAt', 'DESC']]
  }).then(function(news){
    reply({news:news});
  }).catch(reply);
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