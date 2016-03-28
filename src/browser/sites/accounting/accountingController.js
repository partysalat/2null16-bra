'use strict';
module.exports = function ($scope, drinkDialogService) {
  $scope.openCocktails = drinkDialogService.openCocktails;
  $scope.openBeer = drinkDialogService.openBeer;
  $scope.openShot = drinkDialogService.openShot;
  $scope.openCoffee = drinkDialogService.openCoffee;
};

module.exports.$inject = ["$scope", "drinkDialogService"];