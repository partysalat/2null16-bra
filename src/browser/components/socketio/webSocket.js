'use strict';
module.exports = ["$websocket","$location",function($websocket,$location){
  var path = $location.path()
  console.log(path)
  //var socket = $websocket("ws://")
  function on(name,callback){

  }
  return {
    on:on
  }
}];