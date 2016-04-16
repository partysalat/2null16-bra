'use strict';

var
  sequelize = require("./../db/sequelize"),
  DataType = require("sequelize"),
  TABLE_NAME = 'images';

var Images = sequelize.get().define(TABLE_NAME, {
  path: DataType.STRING,
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
  
});
Images.sync();

module.exports = Images;