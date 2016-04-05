'use strict';
angular.module("user",[])

  .factory("User",require("./user"))
  .factory("News",require("./news"));

module.exports = "user";