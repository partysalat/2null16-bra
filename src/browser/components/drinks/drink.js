'use strict';
module.exports = function($resource){
  return $resource("api/drinks");
};
module.exports.$inject = ["$resource"];