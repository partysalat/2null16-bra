'use strict';

var
  sequelize = require("./../db/sequelize"),
  //DataType = require("sequelize"),
  TABLE_NAME = 'userAchievements';
var User = require("./User");
var Achievement = require("./Achievement");
var UserAchievement = sequelize.get().define(TABLE_NAME, {});


UserAchievement.sync();
User.belongsToMany(Achievement,{through:UserAchievement,as:"achievements",foreignKey:"userId"});

Achievement.belongsToMany(User,{through:UserAchievement,as:"users",foreignKey:"achievementId"});
module.exports = UserAchievement;