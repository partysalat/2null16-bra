'use strict';
module.exports = function(){
  var map = {
    COCKTAIL:"/internal/assets/cocktail.jpg",
    COFFEE:"/internal/assets/coffee.jpg",
    SHOT:"/internal/assets/shot.jpg",
    BEER:"/internal/assets/beer.jpg"
  };
  return function(type){
    return map[type];
  };
};
module.exports.$inject = [];