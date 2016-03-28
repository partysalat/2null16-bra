'use strict';
module.exports = function($resource){
  return $resource("api/drinks/cocktails");
};
module.exports.$inject = ["$resource"];