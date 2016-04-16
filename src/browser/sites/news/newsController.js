'use strict';
var barkeepers = require("./barkeepers.json").barkeepers;
var MAX_DISTANCE = 15;
module.exports = function ($scope, news,socket) {
  $scope.news = news.news;
  $scope.barkeepers = barkeepers;
  $scope.isActive = {};
  $scope.distance = {};
  //$scope.isActive[barkeepers[0].name] = true;

  socket.on("keeper", function (data) {

    $scope.isActive[data.name] = typeof data.distance === "number" && data.distance< MAX_DISTANCE;
    $scope.distance[data.name] = Math.round(data.distance);
    $scope.$apply();
  });
  socket.on("news", function (data) {
    data.forEach(function(news){
      $scope.news.unshift(news);
    });
    $scope.$apply();
  });

};

module.exports.$inject = ["$scope", "news","socket"];