'use strict';
//require("angular-websocket")
angular.module("socket",[
  "ngWebSocket"
])

  //.factory("socket",require("./socket"));
  .factory("socket",require("./webSocket"));

module.exports = "socket";