'use strict';
var cocktails = require("./../mock/cocktails.json");
var User = require("./../models/User");

module.exports.getUsers = function(request,reply){
  User.findAll().then(function(users){
    reply({users:users})
  }).catch(reply);
};
