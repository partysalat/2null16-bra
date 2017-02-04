'use strict';
module.exports = function($resource){
  return $resource("api/photo/shoot");
};
module.exports.$inject = ["$resource"];