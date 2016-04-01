'use strict';
module.exports = function($resource){
  return $resource("api/drinks/shot");
};
module.exports.$inject = ["$resource"];