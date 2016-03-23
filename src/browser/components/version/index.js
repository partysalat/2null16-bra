'use strict';
angular.module("at-version",["templates"])

  .directive("version",require("./versionDirective"))
  .service("versionService",require("./versionService"));

module.exports = "at-version";