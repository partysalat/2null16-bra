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
      return promise.map(news, processAchievement(stats, achievements));
    })
    .then(_.flatten)
    .then(function (news) {
      return News.bulkCreate(news);
    });
};

var processAchievement = _.curry(function (stats, achievements, news) {
  if (news.type === News.NEWS_TYPES.DRINK) {
    var userStats = getUserStat(stats, news).toJSON();
    var gainedAchievements = _.filter(achievementDefs, function (def) {
      return def.processor(news, userStats);
    });
    return _.map(gainedAchievements, function (gainedAchievement) {
      return {
        userId: news.userId,
        achievementId:_.find(achievements,{name:gainedAchievement.name}).dataValues.id,
        type: News.NEWS_TYPES.ACHIEVEMENT
      };
    });
  }
  return [];
});

function getUserStat(stats, news) {
  return _.find(stats, function (stat) {
    return stat.dataValues.user.dataValues.id === news.userId;
  });
}
