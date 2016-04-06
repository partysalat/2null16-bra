'use strict';
module.exports = function ($scope,news,$timeout) {
  $scope.news = news.news;
  function reload(){
    $scope.isActive = !$scope.isActive;
    $timeout(reload,1000);
  }
  reload();
};

module.exports.$inject = ["$scope","news","$timeout"];