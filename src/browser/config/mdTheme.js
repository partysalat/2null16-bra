'use strict';
module.exports =  function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('red')
    // .dark();
};
module.exports.$inject = ["$mdThemingProvider"];