'use strict';
module.exports = function($resource){
  return $resource("api/drinks/cocktail",{},{get:{cache:true}});
};
module.exports.$inject = ["$resource"];