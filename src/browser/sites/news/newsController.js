'use strict';
var barkeepers = require("./barkeepers.json").barkeepers;
module.exports = function ($scope, news,socket) {
  $scope.news = news.news;
  $scope.barkeepers = barkeepers;
  $scope.isActive = {};
  $scope.isActive[barkeepers[0].name] = true;

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

module.exports.$inject = ["$scope", "news","socket"];