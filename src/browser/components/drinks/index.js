'use strict';
angular.module("drinks",[])

  .factory("DrinkProcess",require("./drinkProcess"))
  .factory("Cocktail",require("./cocktail"))
  .factory("Beer",require("./beer"))
  .factory("Shot",require("./shot"))
  .factory("Coffee",require("./coffee"));


module.exports = "drinks";