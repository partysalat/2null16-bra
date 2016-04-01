'use strict';
var _ = require("lodash");
module.exports = function ($q, Drink, Users, Cocktails, Shot, Beer, Coffee, $cacheFactory) {
  var httpCache = $cacheFactory.get('$http');
  return {
    clearCache: function () {
      httpCache.removeAll();
    },
    getCocktails: function () {
      return new Cocktails().$get();
    },
    getShots: function () {
      return new Shot().$get();
    },
    getBeer: function () {
      return new Beer().$get();
    },
    getCoffee: function () {
      return new Coffee().$get();
    },
    getUsers: function () {
      return new Users().$get();
    },
    saveDrinks: function (data) {
      return new Drink({
        drink: data.drink.id,
        users: _.map(data.users, "id")
      }).$save();
    }
  };
};


module.exports.$inject = ["$q", "Drink", "Users", "Cocktails", "Shot", "Beer", "Coffee", "$cacheFactory"];
