'use strict';
angular.module("bestlist", [])

  .component("bestlist", require("./bestlistDirective"))
  .factory("Bestlist", require("./bestlist"));

module.exports = "bestlist";