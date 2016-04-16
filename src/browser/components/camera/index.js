'use strict';
angular.module("camera", [])

  .service("cameraService", require("./cameraService"))
  .service("Photo", require("./photo"));

module.exports = "camera";