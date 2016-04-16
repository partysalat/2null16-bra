'use strict';
var io;
var _ = require("lodash");
module.exports.init = function(listener){
  io = require('socket.io')(listener);
};
var keeperNameMapping = {
  "ffff00008185":"flo",
  "ffff0000ed2d":"benni",
  "ffff00009111":"paul",
  "ffff00009c60":"ben",
  "2255db705ff8429881f79ac519d36ffd":"flo",
  "b706d46571ac458fb0816073217877a3":"ben",
  "dc7d903ef0764dffa3abc8060114a77d":"paul",
  "dce103eda61b49d7a435b0a1d1961abe":"benni"
};

module.exports.keeperStatus = function(payload){
  io.emit("keeper",_.assign({},payload,{name:keeperNameMapping[payload.keeper]}));
};
module.exports.addNews = function(news){
  io.emit("news",news);
};
