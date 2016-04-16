'use strict';
var barkeepers = require("./barkeepers.json").barkeepers;
var MAX_DISTANCE = 15;
module.exports = function ($scope, news,socket,News) {
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
  $scope.addItems = function(){
    $scope.isPending = true;
    new News().$get({offset:$scope.news.length})
      .then(function(olderNews){
        olderNews.news.forEach(function(news){
          $scope.news.push(news);
        });
        $scope.isPending = olderNews.news.length === 0;
      });
  };
  $scope.isPending = false;
};

module.exports.$inject = ["$scope", "news","socket","News"];