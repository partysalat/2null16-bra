'use strict';
module.exports = function($resource){
  return $resource("api/users");
};
module.exports.$inject = ["$resource"];