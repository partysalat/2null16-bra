'use strict';
module.exports = function($resource){
  return $resource("api/drinks/beer",{},{get:{cache:true}});
};
module.exports.$inject = ["$resource"];