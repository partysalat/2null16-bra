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
  
  function open(serviceFn,ev){
   return wrapInToast($q.all([serviceFn(),drinkDataService.getUsers()]))
      .then(_.partial(openModelAndSave,ev));
  }
  return {
    openCocktails: _.partial(open,drinkDataService.getCocktails),
    openShot:_.partial(open,drinkDataService.getShots),
    openCoffee:_.partial(open,drinkDataService.getCoffee),
    openBeer:_.partial(open,drinkDataService.getBeer),
    openSoftdrinks:_.partial(open,drinkDataService.getSoftdrinks)
  };
};

module.exports.$inject = ["$mdDialog", "$q","drinkDataService","$mdToast"];