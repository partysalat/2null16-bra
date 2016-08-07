'use strict';
var
  Achievement = require("./../models/Achievement"),
  promise = require("bluebird"),
  News = require("./../models/News"),
  utils = require("./../models/utils"),
  _ = require("lodash");

var Pool = require("threads").Pool;
var pool = new Pool();

pool.run(function (input, done) {
  require(input.processor).processAchievements(input, done);
});

module.exports.processAchievements = function (news /*Array*/) {
  return promise.all([News.getStats(), Achievement.findAll({raw: true}).then(utils.convertRawToJson), News.getAchievements()])
    .spread(function (stats, achievements, userAchievements) {
      return promise.map(news, function (newsItem) {
        return pool.send({
          stats: stats,
          achievements: achievements,
          userAchievements: userAchievements,
          news: newsItem,
          processor: __dirname + "/processAchievements"
        }).promise();
      });
    })
    .then(_.flatten)
    .then(function (news) {
      return News.bulkCreate(news);
    });
};

