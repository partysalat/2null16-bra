'use strict';
module.exports = function($resource){
  return $resource("api/news/:offset",{offset:0});
};
module.exports.$inject = ["$resource"];