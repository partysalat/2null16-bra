'use strict';
module.exports = function($resource){
  return $resource("api/drinks/shot",{},{get:{cache:true}});
};
module.exports.$inject = ["$resource"];