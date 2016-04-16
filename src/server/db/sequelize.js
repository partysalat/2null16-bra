'use strict';
var Sequelize = require("sequelize"),
  config = require("./../../../localConfig"),
  sequelizeInstance;
module.exports.get = function(){

  if(!sequelizeInstance){
    sequelizeInstance =  new Sequelize(
      config.sql.database,
      config.sql.auth.user,
      config.sql.auth.pass,
      config.sql.settings);
  }
  return sequelizeInstance;
};