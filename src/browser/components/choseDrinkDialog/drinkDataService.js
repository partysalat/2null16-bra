'use strict';
var _ = require("lodash");
module.exports = function ($q, DrinkProcess, User, Cocktail, Shot, Beer, Coffee, $cacheFactory) {
  var httpCache = $cacheFactory.get('$http');
  return {
    clearCache: function () {
      httpCache.removeAll();
    },
    getCocktails: function () {
      return new Cocktail().$get();
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
      return new User().$get();
    },
    saveDrinks: function (data) {
      return new DrinkProcess({
        drink: data.drink.id,
        users: _.map(data.users, function(user){
          return {
            id:user.id,
            cardinality:user.cardinality || 1
          };
        })
      }).$save();
    }
  };
};


module.exports.$inject = ["$q", "DrinkProcess", "User", "Cocktail", "Shot", "Beer", "Coffee", "$cacheFactory"];
