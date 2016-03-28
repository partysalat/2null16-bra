'use strict';
var _ = require("lodash");
module.exports = function($q,Drink,Users,Cocktails,$resource){
  return {
    getCocktails: function(){
        return new Cocktails().$get();
    },
    getShots:function(){
      return new ($resource("api/drinks/shot"))().$get();
    },
    getBeer: function(){
      return new ($resource("api/drinks/beer"))().$get();
    },
    getCoffee:function(){
      return new ($resource("api/drinks/coffee"))().$get();
    },
    getUsers: function(){
      return new Users().$get();
    },
    saveDrinks:function(data){
      return new Drink({
        drink:data.drink.id,
        users:_.map(data.users,"id")
      }).$save();
    }
  };
};


module.exports.$inject = ["$q","Drink","Users","Cocktails","$resource"];
