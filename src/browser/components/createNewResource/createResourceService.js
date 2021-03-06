'use strict';
module.exports = function (User,Cocktail,Shot,Beer,Coffee,Softdrink) {
  var drinkTypeMapping = {
    COCKTAIL:Cocktail,
    SHOT:Shot,
    BEER: Beer,
    COFFEE: Coffee,
    SOFTDRINK: Softdrink,
  };
  return {
    createDrink:function(data){
      var DrinkClass = drinkTypeMapping[data.drinkType];
      return new DrinkClass({name:data.name}).$save();
      
    },
    createUser:function(data){
      return new User({name:data.name}).$save();
    }
  };
};


module.exports.$inject = ["User", "Cocktail", "Shot", "Beer", "Coffee","Softdrink"];
