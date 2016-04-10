'use strict';
var barkeepers = require("./barkeepers.json").barkeepers;
module.exports = function ($scope,news,$timeout) {
  $scope.news = news.news;
  $scope.barkeepers = barkeepers;
  $scope.isActive = {};
  $scope.isActive[barkeepers[0].name] = true;
  
};

module.exports.$inject = ["$scope","news","$timeout"];