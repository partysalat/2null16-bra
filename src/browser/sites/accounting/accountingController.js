'use strict';
module.exports = function ($scope, drinkDialogService,drinkDataService) {
  $scope.openCocktails = drinkDialogService.openCocktails;
  $scope.openBeer = drinkDialogService.openBeer;
  $scope.openShot = drinkDialogService.openShot;
  $scope.openCoffee = drinkDialogService.openCoffee;
  $scope.clearCache = drinkDataService.clearCache;
};

module.exports.$inject = ["$scope", "drinkDialogService","drinkDataService"];