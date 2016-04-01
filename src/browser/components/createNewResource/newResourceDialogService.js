'use strict';
module.exports = function ($mdDialog, $q,createResourceService,$mdToast) {
  var DRINK_TYPES = ["COCKTAIL","SHOT","BEER","COFFEE"];
  function openModelAndSave(ev){
    return $mdDialog.show({
        controller: require("./dialogController"),
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
  return {
    openNewUser:function($event){
      console.log("new user",$event);
    },
    openNewDrink:function($event){

      openModelAndSave($event);
    }
  };
};


module.exports.$inject = ["$mdDialog", "$q","createResourceService","$mdToast"];
