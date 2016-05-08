'use strict';
module.exports = function ($scope, drinkDialogService,drinkDataService,newResourceDialogService,cameraService,revertNewsService) {
  $scope.openCocktails = drinkDialogService.openCocktails;
  $scope.openBeer = drinkDialogService.openBeer;
  $scope.openShot = drinkDialogService.openShot;
  $scope.openCoffee = drinkDialogService.openCoffee;
  $scope.openSoftdrinks = drinkDialogService.openSoftdrinks;
  $scope.clearCache = drinkDataService.clearCache;
  $scope.openNewUser = newResourceDialogService.openNewUser;
  $scope.openNewDrink = newResourceDialogService.openNewDrink;
  $scope.takePhoto = cameraService.takePhoto;
  $scope.revertNews = revertNewsService.openModalForRevert;

};

module.exports.$inject = ["$scope", "drinkDialogService","drinkDataService","newResourceDialogService","cameraService","revertNewsDialogService"];