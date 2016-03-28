'use strict';
module.exports = function ($scope, drinkDialogService) {
  $scope.showTabDialog =function(ev){
    drinkDialogService.openCocktails(ev)
      .then(function (answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
  };
};

module.exports.$inject = ["$scope", "drinkDialogService"];