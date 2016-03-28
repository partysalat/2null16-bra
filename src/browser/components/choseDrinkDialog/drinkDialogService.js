module.exports = function ($mdDialog) {
  function openCocktails(ev) {
    return $mdDialog.show({
      controller: require("./dialogController"),
      templateUrl: 'cocktails.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }

  return {
    openCocktails: openCocktails
  }
};

module.exports.$inject = ["$mdDialog"];