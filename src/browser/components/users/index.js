'use strict';
angular.module("user",[])

  .factory("User",require("./user"))
  .factory("News",require("./news"))
  .factory("NewsItem",require("./newsItem"));

module.exports = "user";