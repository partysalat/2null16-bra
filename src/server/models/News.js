'use strict';

var
  sequelize = require("./../db/sequelize"),
  DataType = require("sequelize"),
  TABLE_NAME = 'news';
var User = require("./User"),
  Drink = require("./Drink");
var News = sequelize.get().define(TABLE_NAME, {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

News.belongsTo(User);
News.belongsTo(Drink);

module.exports = News;