'use strict';
module.exports = function($resource){
  return $resource("api/user/bestlist");
};
module.exports.$inject = ["$resource"];