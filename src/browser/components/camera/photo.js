'use strict';
module.exports = function($resource){
  return $resource("api/photo");
};
module.exports.$inject = ["$resource"];