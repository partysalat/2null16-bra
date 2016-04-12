'use strict';
var socket = require("./../socket");
module.exports.notify = function(request,reply){
  reply("ok");
  socket.keeperStatus(request.params.keeper,request.params.status);
};

