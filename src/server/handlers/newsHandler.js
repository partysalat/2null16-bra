'use strict';
var User = require("./../models/User"),
  Drink = require("./../models/Drink"),
  Achievement = require("./../models/Achievement"),
  Images = require("./../models/Image"),
  News = require("./../models/News"),
  socket = require("./../socket"),
  achievementService = require("./../achievements");

var PAGE_SIZE = 10;
var _ = require("lodash");
function findNews(len,includes) {
  return News.findAll({
    limit: len,
    offset: 0,
    include: includes,
    order: [['updatedAt', 'DESC']]

  });
}
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

    return findNews(transformedData.length,[User,Drink])
      .then(function (news) {
        return achievementService.processAchievements(news)
          .then(function (achievementNews) {
            return achievementNews.length + news.length;
          });
      })
      .then(function(newsLength){
        return findNews(newsLength,[User,Achievement,Drink]);
      })
      .then(function (createdNews) {
        socket.addNews(createdNews);
        reply().code(204);
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
    include: [User, Drink, Images,Achievement],
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