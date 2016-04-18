'use strict';
angular.module("revert", [
    "templates",
    require("./../users")
  ])

  .service("revertNewsDialogService", require("./revertNewsDialogService"));

module.exports = "revert";