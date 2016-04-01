'use strict';
angular.module("drinks",[])

  .factory("Drink",require("./drink"))
  .factory("Cocktails",require("./cocktail"))
  .factory("Beer",require("./beer"))
  .factory("Shot",require("./shot"))
  .factory("Coffee",require("./coffee"));


module.exports = "drinks";