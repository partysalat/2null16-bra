'use strict';
angular.module("newslist", [
  require("./../infinitescroll"),
  require("./../cardList"),
  require("./../socketio")
])

  .component("newsList", require("./newsListComponent"));

module.exports = "newslist";