'use strict';
var
  Achievement = require("./../models/Achievement"),
  promise = require("bluebird"),
  News = require("./../models/News"),
  utils = require("./../models/utils"),
  _ = require("lodash"),
  achievementDefs = require("./achievementDefinition");

module.exports.processAchievements = function (news /*Array*/) {
  return promise.all([News.getStats(), Achievement.findAll({raw:true}).then(utils.convertRawToJson), News.getAchievements()])
    .spread(function (stats, achievements, userAchievements) {
      return promise.map(news, processAchievement(stats, achievements, userAchievements));
    })
    .then(_.flatten)
    .then(function (news) {
      return News.bulkCreate(news);
    });
};

var processAchievement = _.curry(function (stats, achievements, usersAchievements, news) {
  if (news.type === News.NEWS_TYPES.DRINK) {
    var userStats = getUserStat(stats, news);
    var userAchievements = usersAchievements[news.userId] || {};
    var gainedAchievements = _.filter(achievementDefs, function (def) {
      return !alreadyGained(userAchievements.achievements,def.name) && def.processor(news, userStats, userAchievements.achievements,stats);
    });
    return _.flatMap(gainedAchievements, function (gainedAchievement) {
      var achievement= _.find(achievements, {name: gainedAchievement.name});
      if(!achievement){
        console.error("Achievement "+ gainedAchievement.name + " not registered in DB!");
        return [];
      }
      return {
        userId: news.userId,
        achievementId:achievement.id ,
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

function alreadyGained(achievementList, name) {
  return _.find(achievementList, function (achievement) {
    return name === achievement.name;
  });
}