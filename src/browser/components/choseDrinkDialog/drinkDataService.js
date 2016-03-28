'use strict';
module.exports = function($q,Drink,Users,Cocktails){
  return {
    getCocktails: function(){
        return new Cocktails().$get();
    },
    getUsers: function(){
      return new Users().$get();
    },
    saveDrinks:function(data){
      return new Drink(data).$save();
    }
  }
};


module.exports.$inject = ["$q","Drink","Users","Cocktails"];
