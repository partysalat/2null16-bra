'use strict';
module.exports = function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/accounting");
  $stateProvider
    .state('accounting', {
      url: "/accounting",
      templateUrl: "accounting.html"
    })

};
module.exports.$inject = ["$stateProvider", "$urlRouterProvider"];