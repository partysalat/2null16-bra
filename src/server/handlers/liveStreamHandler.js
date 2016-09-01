'use strict';
var raspivid = require("raspivid");
var video;
module.exports.stream = function (request, reply) {
  try{

  reply(video).encoding("binary");
  }catch(e){
    console.error(e);
    reply(e);
  }
};
module.exports.start = function (request, reply) {
  video = raspivid({
    width:320,
    height:240
  });
  reply("ok");
};
module.exports.stop = function (request, reply) {
  reply("ok");
};


