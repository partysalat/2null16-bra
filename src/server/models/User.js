'use strict';
var
  sequelize = require("./../db/sequelize"),
  DataType = require("sequelize"),
  TABLE_NAME = 'users';
var User = sequelize.get().define(TABLE_NAME, {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: DataType.STRING,
  image:DataType.STRING
});
User.sync();

module.exports = User;