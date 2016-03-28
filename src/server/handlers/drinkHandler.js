'use strict';
var cocktails = require("./../mock/cocktails.json");
var users = require("./../mock/user.json");
module.exports.save = function (request, reply) {
  reply({status:"ok"})
};


module.exports.getCocktails = function(request,reply){
  reply(cocktails);
};


module.exports.getUsers = function(request,reply){
  reply(users);
};