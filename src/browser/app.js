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
  require("./components/createNewResource"),
  require("./components/users"),
  require("./components/filters"),
  require("./components/socketio"),
  require("./components/camera"),
  require("./components/infinitescroll"),
  require("./components/bestlist"),
  require("./components/revertDialog")
])

.controller("AccountingController",require("./sites/accounting/accountingController"))
.controller("NewsController",require("./sites/news/newsController"))
.config(require("./config/mdTheme"))
.config(require("./config/routes"));