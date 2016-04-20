'use strict';
angular.module("bestlist", [
  require("./../socketio")
])

  .component("bestlist", require("./bestlistDirective"))
  .factory("Bestlist", require("./bestlist"))
  .factory("Achievements", require("./achievements"));

module.exports = "bestlist";