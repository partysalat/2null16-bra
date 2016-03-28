'use strict';
module.exports = function ($mdDialog, $q,drinkDataService,$mdToast) {
  function openCocktails(ev) {
    return $q.all([drinkDataService.getCocktails(),drinkDataService.getUsers()])
      .then(function (data) {
        return $mdDialog.show({
          controller: require("./dialogController"),
          templateUrl: 'cocktails.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          locals: {data: data[0].drinks,users:data[1].users},
          clickOutsideToClose: true
        });
      })
      .then(drinkDataService.saveDrinks)
      .then(function(data){
        $mdToast.show(
          $mdToast.simple()
            .textContent('Erfolgreich gespeichert')
            .position("top left")
            .hideDelay(1000)
        );
        //

        console.log(data);
      })

  }

  return {
    openCocktails: openCocktails
  }
};

module.exports.$inject = ["$mdDialog", "$q","drinkDataService","$mdToast"];