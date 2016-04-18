'use strict';
module.exports = function ($mdDialog, News) {
  function openModalForRevert(ev) {
    new News().$get().then(function (news) {
      return $mdDialog.show({
        controller: require("./revertNewsController"),
        templateUrl: 'revertNews.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {news: news.news},
        clickOutsideToClose: true
      });
    });


  }

  return {
    openModalForRevert: openModalForRevert
  };
};


module.exports.$inject = ["$mdDialog", "News"];
