'use strict';
module.exports = function ($scope,news) {
  $scope.news = news.news;
};

module.exports.$inject = ["$scope","news"];