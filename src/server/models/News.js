'use strict';

var
  sequelize = require("./../db/sequelize"),
  DataType = require("sequelize"),
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
  type: {
    type: DataType.ENUM,
    values: NEWS_TYPES,
    validate: {
      isIn: [NEWS_TYPES]
    }
  }

},{
  classMethods:{
    getStats:function(){
      return this.findAll({
        where: {type: News.NEWS_TYPES.DRINK},
        include: [
          User,
          {model: Drink, attributes: []}
        ],
          attributes: [
        [sequelize.get().fn('count', sequelize.get().col('drinkId')), "drinkCount"],
        [sequelize.get().fn('count', sequelize.get().literal('CASE WHEN drink.type="BEER" THEN 1 END')), "beerCount"],
        [sequelize.get().fn('count', sequelize.get().literal('CASE WHEN drink.type="COCKTAIL" THEN 1 END')), "cocktailCount"],
        [sequelize.get().fn('count', sequelize.get().literal('CASE WHEN drink.type="SHOT" THEN 1 END')), "shotCount"],
        [sequelize.get().fn('count', sequelize.get().literal('CASE WHEN drink.type="COFFEE" THEN 1 END')), "coffeeCount"],
      ],
        group: ["userId"],
        order: [[sequelize.get().col('drinkCount'), 'DESC']]
      });
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