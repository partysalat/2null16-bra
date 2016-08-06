'use strict';
angular.module("filters",[])

  .filter("icon",require("./icon"))
  .filter("colortext",require("./colortext"))
  .filter("toDate",require("./toDate"))
  .filter("typeimage",require("./typeImages"));

module.exports = "filters";