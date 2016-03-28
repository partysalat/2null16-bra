'use strict';
module.exports =  function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange')
    .dark();
};
module.exports.$inject = ["$mdThemingProvider"];