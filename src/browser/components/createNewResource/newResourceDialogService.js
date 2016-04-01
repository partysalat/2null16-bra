'use strict';
module.exports = function ($mdDialog, $q,createResourceService,$mdToast) {
  function openModelAndSave(ev){
    return $mdDialog.show({
        controller: require("./dialogController"),
        templateUrl: 'newDrink.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        //locals: {data: data[0].drinks,users:data[1].users},
        clickOutsideToClose: true
      })
      .then(createResourceService.saveDrinks)
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
      openModelAndSave($event);
    },
    openNewDrink:function(){
      console.log("new drink");
    }
  };
};


module.exports.$inject = ["$mdDialog", "$q","createResourceService","$mdToast"];
