'use strict';
var _ = require("lodash");
module.exports = function ($scope, $mdDialog,news,News,NewsItem) {
  $scope.news = news;
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function () {
    $mdDialog.hide({
      drinkType:$scope.activeDrink,
      name:$scope.name
    });
  };
  $scope.removeNews = function(news){
    return new NewsItem().$delete({id:news.id}).then(function(){
      _.remove($scope.news,function(newsItem){
        return newsItem===news;
      });
    });
  };
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

module.exports.$inject = ["$scope","$mdDialog","news","News","NewsItem"];