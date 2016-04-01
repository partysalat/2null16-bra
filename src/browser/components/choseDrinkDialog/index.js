'use strict';
angular.module("chose-drink", [
    "templates",
    require("./../drinks")
  ])

  .service("drinkDataService", require("./drinkDataService"))
  .factory("Users", require("./resources/users"))
  .service("drinkDialogService", require("./drinkDialogService"));

module.exports = "chose-drink";