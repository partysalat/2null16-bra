'use strict';
module.exports = function($resource){
  return $resource("api/drinks/coffee");
};
module.exports.$inject = ["$resource"];