'use strict';
module.exports = ["$websocket","$location","$timeout",function($websocket,$location,$timeout){
  var path = "ws://"+$location.host() + ":9000/api/socket";
  //var path = "ws://bra:9000/api/socket";
  var
    socket,
    restartTimeout;
  var EventEmitter = require("events");
  var emitter = new EventEmitter();
  function heartBeat(){
    $timeout(function(){
      socket.send("3");
      heartBeat();
    },10000);
  }
  function start(){

    socket = $websocket(path);
    restartTimeout = null;
    socket.onMessage(function(data){
      try{
        var parsedEventData = JSON.parse(data.data);
        emitter.emit(parsedEventData[0],parsedEventData[1]);
      }catch(e){

      }

    });
    socket.onClose(function(){
      if(restartTimeout){
        return;
      }
      restartTimeout = $timeout(start,2000);
    });
    socket.onError(function(){
      if(restartTimeout){
        return;
      }
      restartTimeout = $timeout(start,2000);
    });


  }
  start();
  heartBeat();
  return {
    on:emitter.on.bind(emitter),
    off:emitter.removeListener.bind(emitter)
  };
}];