'use strict';
var _ = require("lodash");
module.exports = function ($scope, $mdDialog,data,users) {
  $scope.data = data;
  $scope.users = users;
  $scope.page = "drink";
  $scope.activeUsers = [];
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function () {
    $mdDialog.hide({
      drink:$scope.chosenDrink,
      users:$scope.activeUsers
    });
  };
  $scope.goToUserPage = function(drink){
    $scope.chosenDrink = drink;
    $scope.page = "users";
  };
  $scope.isActive = function(user){
    return _.includes($scope.activeUsers,user);
  };
  $scope.toggleUser = function(user){
    return $scope.isActive(user)?_.remove($scope.activeUsers,user):$scope.activeUsers.push(user);
  };
  
};

module.exports.$inject = ["$scope","$mdDialog","data","users"];