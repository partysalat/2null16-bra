'use strict';
module.exports = function($resource){
  return $resource("api/news/:page",{page:0},{get:{cache:true}});
};
module.exports.$inject = ["$resource"];