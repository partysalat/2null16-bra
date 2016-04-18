'use strict';
module.exports = function($resource){
  return $resource("api/news/item/:id");
};
module.exports.$inject = ["$resource"];