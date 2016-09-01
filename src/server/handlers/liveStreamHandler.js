'use strict';
var RaspiCam = require("raspicam");
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


