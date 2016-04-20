'use strict';
angular.module("keeper", [
  require("./../socketio")
])

  .component("keeperList", require("./keeperListComponent.js"));

module.exports = "keeper";