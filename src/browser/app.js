'use strict';
angular.module("app", [
  require("angular-resource"),

  require("angular-animate"),
  require("angular-aria"),
  require("angular-messages"),
  require("angular-material"),
  'ngMaterial',
  'ui.router',
  require("./components/choseDrinkDialog"),
  require("./components/createNewResource")
])

.controller("AccountingController",require("./sites/accounting/accountingController"))
.config(require("./config/mdTheme"))
.config(require("./config/routes"));