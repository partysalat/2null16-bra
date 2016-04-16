'use strict';
angular.module('infinite-scroll', [])
  .directive("infiniteScroll",require("./infiniteScrollDirective"));

module.exports = "infinite-scroll";