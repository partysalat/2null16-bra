'use strict';

var
  sequelize = require("./../db/sequelize"),
  DataType = require("sequelize"),
  TABLE_NAME = 'achievements';
var Achievement = sequelize.get().define(TABLE_NAME, {
  name: DataType.STRING,
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imagePath:DataType.STRING,
  description:DataType.STRING
});
Achievement.sync();

module.exports = Achievement;