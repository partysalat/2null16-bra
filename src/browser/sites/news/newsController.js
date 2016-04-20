'use strict';

var _ = require("lodash");
module.exports = function ($scope, news,socket,News,bestlist,Bestlist,Achievements) {
  $scope.news = news.news;

  socket.on("news", function (data) {
    data.reverse().forEach(function(news){
      $scope.news.unshift(news);
    });
    $scope.$apply();
    new Bestlist().$get().then(function(bestlist){
      $scope.bestlist = bestlist.bestlist;
    });
    getAchievements();
  });
  socket.on("news.delete",function(id){
    _.remove($scope.news,function(newsItem){
      return newsItem.id === id;
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
  function getAchievements(){
    new Achievements().$get().then(function(achievements){
      $scope.achievements = achievements;
    });
  }
  $scope.isPending = false;
  $scope.bestlist=bestlist.bestlist;
  getAchievements();
};

module.exports.$inject = ["$scope", "news","socket","News","bestlist","Bestlist","Achievements"];