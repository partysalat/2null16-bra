'use strict';

var
  sequelize = require("./../db/sequelize"),
  DataType = require("sequelize"),
  TABLE_NAME = 'news';
var User = require("./User"),
  Drink = require("./Drink"),
  Images = require("./Image");
var NEWS_TYPES_MAP = {
  DRINK: "DRINK",
  IMAGE: "IMAGE"
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

});

News.belongsTo(User);
News.belongsTo(Drink);
News.belongsTo(Images);
News.sync();
module.exports = News;
module.exports.NEWS_TYPES = NEWS_TYPES_MAP;