'use strict';
var
  Achievement = require("./../models/Achievement"),
  promise = require("bluebird"),
  News = require("./../models/News"),
  utils = require("./../models/utils"),
  _ = require("lodash"),
  achievementDefs = require("./achievementDefinition");

module.exports.processAchievements = function (news /*Array*/) {
  console.time("achievement");
  return promise.all([News.getStats(), Achievement.findAll({raw:true}).then(utils.convertRawToJson), News.getAchievements()])
    .spread(function (stats, achievements, userAchievements) {
      return promise.map(news, processAchievement(stats, achievements, userAchievements));
    })
    .then(_.flatten)
    .then(function (news) {
      console.timeEnd("achievement");
      return News.bulkCreate(news);
    });
};

var processAchievement = _.curry(function (stats, achievements, usersAchievements, news) {
  if (news.type === News.NEWS_TYPES.DRINK) {
    var userStats = getUserStat(stats, news);
    var userAchievements = usersAchievements[news.userId] || {};
    var gainedAchievements = _.filter(achievementDefs, function (def) {
      return def.processor(news, userStats, userAchievements.achievements);
    });
    return _.map(gainedAchievements, function (gainedAchievement) {
      return {
        userId: news.userId,
        achievementId: _.find(achievements, {name: gainedAchievement.name}).id,
        type: News.NEWS_TYPES.ACHIEVEMENT
      };
    });
  }
  return [];
});

function getUserStat(stats, news) {
  return _.find(stats, function (stat) {
    return stat.user.id === news.userId;
  });
}
