'use strict';
angular.module("app", [
    require("angular-resource"),

    require("angular-animate"),
    require("angular-aria"),
    require("angular-messages"),
    require("angular-material"),
    'ngMaterial',
    require("./components/version")
  ])

  .config(require("./config/mdTheme"));