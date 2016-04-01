'use strict';
angular.module("chose-drink",[
  "templates"
])

.service("drinkDataService",require("./drinkDataService"))
.factory("Drink",require("./resources/drink"))
.factory("Cocktails",require("./resources/cocktail"))
.factory("Beer",require("./resources/beer"))
.factory("Shot",require("./resources/shot"))
.factory("Coffee",require("./resources/coffee"))
.factory("Users",require("./resources/users"))
.service("drinkDialogService",require("./drinkDialogService"));

module.exports = "chose-drink";