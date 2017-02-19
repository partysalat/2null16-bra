'use strict';
angular.module("cardlist", [require("./../lightbox")])

  .component("cardList", require("./cardListComponent"))
  .filter("unique", require("./uniqueFilter"));

module.exports = "cardlist";