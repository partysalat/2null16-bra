'use strict';
angular.module("chose-drink", [
    "templates",
    require("./../drinks"),
    require("./../users"),
    require("./../../shared/longpress")
  ])

  .service("drinkDataService", require("./drinkDataService"))
  .service("drinkDialogService", require("./drinkDialogService"));

module.exports = "chose-drink";