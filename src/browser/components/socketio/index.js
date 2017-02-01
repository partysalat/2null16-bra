'use strict';
angular.module("socket",[])

  //.factory("socket",require("./socket"));
  .factory("socket",require("./webSocket"));

module.exports = "socket";