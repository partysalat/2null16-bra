'use strict';
var User = require("./../models/User"),
  Drink = require("./../models/Drink"),
  Images = require("./../models/Image"),
  News = require("./../models/News"),
  socket = require("./../socket"),
  achievementService = require("./../achievements");

var PAGE_SIZE = 10;
var _ = require("lodash");
module.exports.save = function (request, reply) {
  var initialData = request.payload;
  var transformedData = _.map(initialData.users, function (userId) {
    return {
      drinkId: initialData.drink,
      userId: userId,
      type: News.NEWS_TYPES.DRINK
    };
  });
  return News.bulkCreate(transformedData).then(function () {
    reply().code(204);
    return achievementService.processAchievements(transformedData).then(function () {
        return News.findAll({
          limit: transformedData.length,
          offset: 0,
          include: [User, Drink],
          order: [['updatedAt', 'DESC']]
        })

      })
      .then(function (createdNews) {
        socket.addNews(createdNews);

      }).catch(console.error);


  }).catch(function (err) {
    console.error(err);
    reply(err);
  });
};


module.exports.getNews = function (request, reply) {
  var page = request.params.page;

  News.findAll({
    limit: PAGE_SIZE,
    offset: page,
    include: [User, Drink, Images],
    order: [['updatedAt', 'DESC']]
  }).then(function (news) {
    reply({news: news});
  }).catch(function (err) {
    console.error(err);
    reply(err);
  });
};


module.exports.remove = function (request, reply) {
  var newsId = request.params.newsId;
  News.destroy({
      where: {
        id: newsId
      }
    })
    .then(function () {
      socket.removeNews(newsId);
    })
    .then(reply)
    .catch(function (err) {
      console.error(err);
      reply(err);
    });
};