'use strict';
module.exports = function($resource){
  return $resource("api/user/achievements");
};
module.exports.$inject = ["$resource"];