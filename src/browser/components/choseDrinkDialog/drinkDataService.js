'use strict';
var _ = require("lodash");
module.exports = function($q,Drink,Users,Cocktails){
  return {
    getCocktails: function(){
        return new Cocktails().$get();
    },
    getUsers: function(){
      return new Users().$get();
    },
    saveDrinks:function(data){
      data.drink = data.drink.id;
      data.users = _.map(data.users,"id");
      return new Drink(data).$save();
    }
  }
};


module.exports.$inject = ["$q","Drink","Users","Cocktails"];
