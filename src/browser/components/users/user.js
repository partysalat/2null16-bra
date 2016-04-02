'use strict';
module.exports = function($resource){
  return $resource("api/user",{},{get:{cache:true}});
};
module.exports.$inject = ["$resource"];