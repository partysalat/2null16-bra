'use strict';
angular.module("app", [
  require("angular-resource"),

  require("angular-animate"),
  require("angular-aria"),
  require("angular-messages"),
  require("angular-material"),
  'ngMaterial',
  'ui.router',
  require("./components/version")
])

.config(require("./config/mdTheme"))
.config(require("./config/routes"));