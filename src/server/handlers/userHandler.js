'use strict';
var User = require("./../models/User");

module.exports.getUsers = function(request,reply){
  User.findAll().then(function(users){
    reply({users:users});
  }).catch(reply);
};
module.exports.saveUser = function(request,reply){
  var name = request.payload.name;
  User.create({
    name:name
  }).then(reply).catch(function(error){
    console.log(error);
    reply(error);
  });
};
