'use strict';
module.exports = function($resource){
  return $resource("api/drinks/coffee",{},{get:{cache:true}});
};
module.exports.$inject = ["$resource"];