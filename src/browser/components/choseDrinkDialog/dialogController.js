'use strict';
var _ = require("lodash");
module.exports = function ($scope, $mdDialog,data,users) {
  $scope.data = data;
  $scope.users = users;
  $scope.page = "drink";
  var activeUsers = [];
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function () {
    $mdDialog.hide({
      drink:$scope.chosenDrink,
      user:activeUsers
    });
  };
  $scope.goToUserPage = function(drink){
    $scope.chosenDrink = drink;
    $scope.page = "users";
  };
  $scope.isActive = function(user){
    return _.includes(activeUsers,user);
  };
  $scope.toggleUser = function(user){
    $scope.isActive(user)?_.remove(activeUsers,user):activeUsers.push(user);
  };
  
};

module.exports.$inject = ["$scope","$mdDialog","data","users"];