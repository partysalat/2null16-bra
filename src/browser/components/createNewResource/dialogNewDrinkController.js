'use strict';
module.exports = function ($scope, $mdDialog,data) {
  $scope.data = data;
  $scope.activeDrink = null;
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
  $scope.choseDrink = function(drink){
    $scope.chosenDrink = drink;
  };
  $scope.isActive = function(drink){
    return $scope.activeDrink === drink;
  };
  $scope.toggleDrink = function(drink){
    $scope.activeDrink = drink;
  };
  
};

module.exports.$inject = ["$scope","$mdDialog","data"];