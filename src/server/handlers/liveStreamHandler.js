'use strict';
var RaspiCam = require("raspicam");
var video;
module.exports.stream = function (request, reply) {
  reply(video);
};
module.exports.start = function (request, reply) {
  video = new RaspiCam({
    w:320,
    h:240,
    mode:"video",
    output:"-"
  });

  video.start();
  video.on("started",function(){
    reply("ok");
  });
};
module.exports.stop = function (request, reply) {
  reply("ok");
  if(video){
    video.stop();
  }
  video  = null;

};


