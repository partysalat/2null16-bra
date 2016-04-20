'use strict';
angular.module("bestlist", [])

  .component("bestlist", require("./bestlistDirective"))
  .factory("Bestlist", require("./bestlist"))
  .factory("Achievements", require("./achievements"));

module.exports = "bestlist";