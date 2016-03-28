'use strict';
var _ = require("lodash");
module.exports = function ($mdDialog, $q,drinkDataService,$mdToast) {
  function openModelAndSave(ev,data){
      return $mdDialog.show({
        controller: require("./dialogController"),
        templateUrl: 'cocktails.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {data: data[0].drinks,users:data[1].users},
        clickOutsideToClose: true
      })
      .then(drinkDataService.saveDrinks)
      .then(function(){
        $mdToast.show(
          $mdToast.simple()
            .textContent('Erfolgreich gespeichert')
            .position("top left")
            .hideDelay(1000)
        );
      });

  }
  function openCocktails(ev) {
    return $q.all([drinkDataService.getCocktails(),drinkDataService.getUsers()]).then(_.partial(openModelAndSave,ev));

  }
  function openShot(ev){
    return $q.all([drinkDataService.getShots(),drinkDataService.getUsers()]).then(_.partial(openModelAndSave,ev));
  }
  function openBeer(ev){
    return $q.all([drinkDataService.getBeer(),drinkDataService.getUsers()]).then(_.partial(openModelAndSave,ev));
  }
  function openCoffee(ev){
    return $q.all([drinkDataService.getCoffee(),drinkDataService.getUsers()]).then(_.partial(openModelAndSave,ev));
  }
  return {
    openCocktails: openCocktails,
    openShot:openShot,
    openCoffee:openCoffee,
    openBeer:openBeer
  };
};

module.exports.$inject = ["$mdDialog", "$q","drinkDataService","$mdToast"];