'use strict';
var _ = require("lodash");
module.exports = function ($scope, $mdDialog,data,users,$timeout) {
  $scope.data = _.sortBy(data,"name");
  $scope.users = _.sortBy(users,"name");
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
  $scope.toggleUser = function(user,state){
    var isActive = $scope.isActive(user);
    if(typeof state==="boolean"){
      return state?(!isActive && $scope.activeUsers.push(user)):_.remove($scope.activeUsers,user);
    }
    return isActive?_.remove($scope.activeUsers,user):$scope.activeUsers.push(user);
  };
  $scope.openSlider = function($mdOpenMenu,$event){
    $mdOpenMenu($event);
    //hack because of an angular material bug with menus in modal windows
    $timeout(function(){
      var element = angular.element(document.querySelectorAll(".md-open-menu-container.md-whiteframe-z2"));
      element.css({
        left:($event.clientX -115) + "px",
        top:$event.clientY + "px"
      });
    });
  };
  
};

module.exports.$inject = ["$scope","$mdDialog","data","users","$timeout"];