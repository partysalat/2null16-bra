'use strict';
angular.module("cameraButton", [
  require("./../camera")
])

  .component("cameraButton", require("./cameraButtonComponent.js"));

module.exports = "cameraButton";