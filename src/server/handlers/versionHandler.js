'use strict';
var packageInfo = require('pkginfo'),
  User = require("./../models/User"),
  Drink = require("./../models/Drink"),
  News = require("./../models/News"),
  Images = require("./../models/Image"),
  Achievement = require("./../models/Achievement"),
  //UserAchievement = require("./../models/UserAchievement"),
  promise = require("bluebird"),
  _ = require("lodash");
require("./../models/UserAchievement");
module.exports = function version(request, reply) {
  var applicationVersion = packageInfo.read(module).package.version;
  reply({Version: applicationVersion});
};

var users = require("./../mock/user.json");
module.exports.sync = function (request, reply) {
  syncUser().then(reply).catch(errorHandler(reply));

};
function syncUser() {
  return User.sync({force: true}).then(function () {
    return User.bulkCreate(users.users);
  });

}
var drinks = require("./../mock/cocktails.json");
module.exports.syncDrinks = function (request, reply) {
  syncDrinks().then(reply).catch(errorHandler(reply));
};
function syncDrinks() {
  return Drink.sync({force: true}).then(function () {
    return Drink.bulkCreate(drinks.drinks);
  });

}
module.exports.syncNews = function (request, reply) {
  syncNews().then(function () {
    reply("ok");
  }).catch(errorHandler(reply));
};

function syncNews() {
  return News.sync({force: true}).catch(function (err) {
    console.log(err);
  });
}

module.exports.install = function (request, reply) {
  promise.all([
    syncNews(),
    syncDrinks(),
    syncUser(),
    syncAchievements(),
    Images.sync({force: true}),
    //UserAchievement.sync({force: true})
  ]).then(function () {
      reply("OK");
    })
    .catch(errorHandler(reply));

};
var achievementDefs = require("./../achievements/achievementDefinition");
function syncAchievements() {
  return Achievement.sync({force: true})
    .then(function () {
      var achievements = _.map(achievementDefs, function (achievement) {
        return {
          name: achievement.name,
          description: achievement.description,
          imagePath: achievement.image
        };
      });
      return Achievement.bulkCreate(achievements);
    });
}

var errorHandler = _.curry(function (reply, error) {
  console.error("ERRRO", error);
  reply(error);
});

module.exports.addAchievement = function (request, reply) {
  promise.all([User.findOne({where: {id: 1}}), Achievement.findOne({where: {id: 1}})])
    .spread(function (person, achievement) {
      return person.addAchievement(5).then(function () {
        return person.getAchievements().then(function (achievements) {
          //console.log(JSON.stringify(achievements,null,2))
          reply(achievements);
        })
      })
    }).catch(errorHandler(reply));
};