'use strict';
var io;
module.exports.init = function(listener){
  io = require('socket.io')(listener);
};


module.exports.keeperStatus = function(keeper,status){
  io.emit("keeper",{status:status,keeper:keeper});
};
module.exports.addNews = function(news){
  io.emit("news",news);
};
