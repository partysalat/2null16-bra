'use strict';
module.exports = function($resource){
  return $resource("api/drinks/cocktail");
};
module.exports.$inject = ["$resource"];

