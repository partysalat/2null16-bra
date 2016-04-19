'use strict';
var
  Achievement = require("./../models/Achievement"),
  promise = require("bluebird"),
  News = require("./../models/News"),
  _ = require("lodash"),
  achievementDefs = require("./achievementDefinition");

module.exports.processAchievements = function (news /*Array*/) {
  return promise.all([News.getStats(), Achievement.findAll()])
    .spread(function (stats, achievements) {
      return promise.map(news, processAchievement(stats,achievements));
    })
    .then(function(news){
      return _.flatten(news);
    })
    .then();
};

var processAchievement = _.curry(function (stats, achievements,news) {
  if (news.type === News.NEWS_TYPES.DRINK) {
    var userStats = getUserStat(stats, news).toJSON();
    var newsJson = news;
    var gainedAchievements = _.filter(achievementDefs, function (def) {
      return def.processor(newsJson, userStats);
    });

    console.log(gainedAchievements);

    return _.map(gainedAchievements,function(gainedAchievement){
      return {
        userId:news.userId,
        //achievementId:
        type:News.NEWS_TYPES.ACHIEVEMENT
      }
    });
  }
});

function getUserStat(stats, news) {
  return _.find(stats, function (stat) {
    return stat.dataValues.user.dataValues.id === news.dataValues.userId;
  });
}
