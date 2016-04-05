'use strict';
module.exports = function(){
  var map = {
    COCKTAIL:"fa-glass",
    COFFEE:"fa-coffee",
    SHOT:"fa-bolt",
    BEER:"fa-beer"
  };
  return function(type){
    return map[type];
  };
};
module.exports.$inject = [];