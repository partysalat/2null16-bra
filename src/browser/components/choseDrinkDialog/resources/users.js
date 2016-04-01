'use strict';
module.exports = function($resource){
  return $resource("api/users",{},{get:{cache:true}});
};
module.exports.$inject = ["$resource"];