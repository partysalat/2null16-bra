'use strict';
angular.module("drinks",[])

  .factory("DrinkProcess",require("./drinkProcess"))
  .factory("Cocktail",require("./cocktail"))
  .factory("Beer",require("./beer"))
  .factory("Shot",require("./shot"))
  .factory("Coffee",require("./coffee"))
  .factory("Softdrink",require("./softdrink"));


module.exports = "drinks";