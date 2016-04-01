'use strict';
angular.module("create-resource", [
    "templates"
  ])

  .service("createResourceService", require("./createResourceService"))
  .service("newResourceDialogService", require("./newResourceDialogService"));

module.exports = "create-resource";