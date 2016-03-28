'use strict';

var
  sequelize = require("./../db/sequelize"),
  DataType = require("sequelize"),
  TABLE_NAME = 'users';

var User = sequelize.get().define(TABLE_NAME, {
  name: DataType.STRING,
  image:DataType.STRING
});


module.exports = User;