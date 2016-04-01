'use strict';
module.exports = function($resource){
  return $resource("api/drinks/beer");
};
module.exports.$inject = ["$resource"];