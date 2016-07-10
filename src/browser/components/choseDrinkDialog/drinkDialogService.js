'use strict';
var _ = require("lodash");
module.exports = function ($mdDialog, $q,drinkDataService,$mdToast) {
  function openModelAndSave(ev,data){
      return $mdDialog.show({
        controller: require("./dialogController"),
        templateUrl: 'drink.html',
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
  function openLoadingToast(message,delay){
    $mdToast.show(
      $mdToast.simple()
        .textContent(message||'Lade')
        .position("top center")
        .hideDelay(delay || 0)
    );

  }
  function closeLoadingToast(data){
    $mdToast.hide();
    return data;
  }
  function wrapInToast(promise){
    openLoadingToast();
    return promise
      .then(closeLoadingToast)
      .catch(function(error){
        openLoadingToast("Ein Fehler beim Laden ist aufgetreten!",2000);
        throw error;
      });
  }
  function openCocktails(ev) {
    return wrapInToast($q.all([drinkDataService.getCocktails(),drinkDataService.getUsers()]))
      .then(_.partial(openModelAndSave,ev));

  }
  function openShot(ev){
    return wrapInToast($q.all([drinkDataService.getShots(),drinkDataService.getUsers()]))
      .then(_.partial(openModelAndSave,ev));
  }
  function openBeer(ev){
    return wrapInToast($q.all([drinkDataService.getBeer(),drinkDataService.getUsers()]))
      .then(_.partial(openModelAndSave,ev));
  }
  function openCoffee(ev){
    return wrapInToast($q.all([drinkDataService.getCoffee(),drinkDataService.getUsers()]))
      .then(_.partial(openModelAndSave,ev));
  }
  function openSoftdrinks(ev){
    return wrapInToast($q.all([drinkDataService.getSoftdrinks(),drinkDataService.getUsers()])).then(_.partial(openModelAndSave,ev));
  }
  return {
    openCocktails: openCocktails,
    openShot:openShot,
    openCoffee:openCoffee,
    openBeer:openBeer,
    openSoftdrinks:openSoftdrinks
  };
};

module.exports.$inject = ["$mdDialog", "$q","drinkDataService","$mdToast"];