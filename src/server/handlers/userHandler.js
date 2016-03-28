'use strict';
var User = require("./../models/User");

module.exports.getUsers = function(request,reply){
  User.findAll().then(function(users){
    reply({users:users});
  }).catch(reply);
};
