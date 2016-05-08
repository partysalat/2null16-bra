'use strict';

var
  sequelize = require("./../db/sequelize"),
  utils = require("./utils"),
  DataType = require("sequelize"),
  _ = require("lodash"),
  TABLE_NAME = 'news';
var User = require("./User"),
  Drink = require("./Drink"),
  Images = require("./Image"),
  Achievement = require("./Achievement");
var NEWS_TYPES_MAP = {
  DRINK: "DRINK",
  IMAGE: "IMAGE",
  ACHIEVEMENT: "ACHIEVEMENT"
};
var NEWS_TYPES = [NEWS_TYPES_MAP.DRINK, NEWS_TYPES_MAP.IMAGE];
var News = sequelize.get().define(TABLE_NAME, {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cardinality:{
    type:DataType.INTEGER,
    validate:{
      min:1
    }
  },
  type: {
    type: DataType.ENUM,
    values: NEWS_TYPES,
    validate: {
      isIn: [NEWS_TYPES]
    }
  }

}, {
  classMethods: {
    getAchievements: function () {
      return this.findAll({
        where: {type: News.NEWS_TYPES.ACHIEVEMENT},
        include: [User, Achievement],
        attributes: [],
        raw: true
      }).then(function (list) {
        return _(utils.convertRawToJson(list))
          .groupBy('user.id')
          .mapValues(function (val) {
            return {
              user: _.first(val).user,
              achievements: _.map(val, "achievement")
            };
          })
          .value();
      });
    },
    getStats: function () {
      return this.findAll({
        where: {type: News.NEWS_TYPES.DRINK},
        include: [
          User,
          {model: Drink, attributes: []}
        ],
        attributes: [
          [sequelize.get().fn('sum', sequelize.get().col('cardinality')), "drinkCount"],
          [sequelize.get().fn('sum', sequelize.get().literal('CASE WHEN drink.type="BEER" THEN cardinality END')), "beerCount"],
          [sequelize.get().fn('sum', sequelize.get().literal('CASE WHEN drink.type="COCKTAIL" THEN cardinality END')), "cocktailCount"],
          [sequelize.get().fn('sum', sequelize.get().literal('CASE WHEN drink.type="SHOT" THEN cardinality END')), "shotCount"],
          [sequelize.get().fn('sum', sequelize.get().literal('CASE WHEN drink.type="COFFEE" THEN cardinality END')), "coffeeCount"],
          [sequelize.get().fn('sum', sequelize.get().literal('CASE WHEN drink.type="SOFTDRINK" THEN cardinality END')), "softdrinkCount"],
        ],
        group: ["userId"],
        order: [[sequelize.get().col('drinkCount'), 'DESC']],
        raw: true
      }).then(utils.convertRawToJson);
    }
  }
});

News.belongsTo(User);
News.belongsTo(Drink);
News.belongsTo(Images);
News.belongsTo(Achievement);

News.sync();
module.exports = News;
module.exports.NEWS_TYPES = NEWS_TYPES_MAP;