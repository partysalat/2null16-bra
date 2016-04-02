'use strict';
angular.module("create-resource", [
    "templates",
    require("./../drinks"),
    require("./../users")
  ])

  .service("createResourceService", require("./createResourceService"))
  .service("newResourceDialogService", require("./newResourceDialogService"));

module.exports = "create-resource";