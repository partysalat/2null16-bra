'use strict';
var barkeepers = require("./barkeepers.json").barkeepers;
var io = require("socket.io-client");
module.exports = function ($scope, news) {
  $scope.news = news.news;
  $scope.barkeepers = barkeepers;
  $scope.isActive = {};
  $scope.isActive[barkeepers[0].name] = true;
  var socket = io('/');
  socket.on("keeper", function (data) {
    $scope.isActive[data.keeper] = data.status === "online";
    $scope.$apply();
  });
  socket.on("news", function (data) {
    data.forEach(function(news){
      $scope.news.unshift(news);
    });
    $scope.$apply();
  });

};

module.exports.$inject = ["$scope", "news"];