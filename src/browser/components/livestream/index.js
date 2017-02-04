'use strict';
var MODULE_NAME = "livestream";

angular.module(MODULE_NAME, ['ngMaterial'])
  .component('livestream', require("./liveStream.component"));


module.exports =MODULE_NAME;