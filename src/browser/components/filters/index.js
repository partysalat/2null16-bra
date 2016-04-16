'use strict';
angular.module("filters",[])

  .filter("icon",require("./icon"))
  .filter("typeimage",require("./typeImages"));

module.exports = "filters";