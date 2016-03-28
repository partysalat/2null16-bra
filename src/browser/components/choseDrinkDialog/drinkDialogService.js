module.exports = function ($mdDialog, drinkDataService) {
  function openCocktails(ev) {
    return drinkDataService.getCocktails()
      .then(function (cocktails) {
        return $mdDialog.show({
          controller: require("./dialogController"),
          templateUrl: 'cocktails.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          locals: {data: cocktails.drinks},
          clickOutsideToClose: true
        });
      })

  }

  return {
    openCocktails: openCocktails
  }
};

module.exports.$inject = ["$mdDialog", "drinkDataService"];