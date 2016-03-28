'use strict';
angular.module("chose-drink",[
  "templates"
])

.service("drinkDataService",require("./drinkDataService"))
.factory("Drink",require("./resources/drink"))
.factory("Cocktails",require("./resources/cocktails"))
.factory("Users",require("./resources/users"))
.service("drinkDialogService",require("./drinkDialogService"));

module.exports = "chose-drink";