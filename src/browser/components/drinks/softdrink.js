'use strict';
module.exports = function($resource){
  return $resource("api/drinks/softdrink",{},{get:{cache:true}});
};
module.exports.$inject = ["$resource"];