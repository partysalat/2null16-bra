'use strict';
module.exports = function ($mdDialog, $q,createResourceService,$mdToast) {
  var DRINK_TYPES = ["COCKTAIL","SHOT","BEER","COFFEE"];
  function openModalAndSaveDrink(ev){
    return $mdDialog.show({
        controller: require("./dialogNewDrinkController"),
        templateUrl: 'newDrink.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {data: DRINK_TYPES},
        clickOutsideToClose: true
      })
      .then(createResourceService.createDrink)
      .then(function(){
        $mdToast.show(
          $mdToast.simple()
            .textContent('Erfolgreich gespeichert')
            .position("top left")
            .hideDelay(1000)
        );
      });

  }
  function openModalAndSaveUser(ev){
    return $mdDialog.show({
        controller: require("./dialogNewDrinkController"),
        templateUrl: 'newUser.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {data: {}},
        clickOutsideToClose: true
      })
      .then(createResourceService.createUser)
      .then(function(){
        $mdToast.show(
          $mdToast.simple()
            .textContent('Erfolgreich gespeichert')
            .position("top left")
            .hideDelay(1000)
        );
      });

  }

  return {
    openNewUser:function($event){
      openModalAndSaveUser($event);
    },
    openNewDrink:function($event){

      openModalAndSaveDrink($event);
    }
  };
};


module.exports.$inject = ["$mdDialog", "$q","createResourceService","$mdToast"];
