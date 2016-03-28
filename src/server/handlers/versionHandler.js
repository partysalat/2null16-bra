/*jslint node: true*/
'use strict';
var packageInfo = require('pkginfo');
var User = require("./../models/User");
var Drink = require("./../models/Drink");
module.exports = function version(request, reply) {
  var applicationVersion = packageInfo.read(module).package.version;
  reply({Version: applicationVersion});
};

var users = require("./../mock/user.json");
module.exports.sync = function(request,reply){
  User.sync({force:true}).then(function(){
    User.bulkCreate(users.users).then(reply).catch(reply);
  })

};
var drinks = require("./../mock/cocktails.json");
module.exports.syncDrinks = function(request,reply){
  Drink.sync({force:true}).then(function(){
    Drink.bulkCreate(drinks.drinks).then(reply).catch(function(err){
      console.log(err);
      reply(err)
    });
  })

};
