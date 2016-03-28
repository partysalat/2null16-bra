'use strict';
module.exports = function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/accounting");
  $stateProvider
    .state('accounting', {
      url: "/accounting",
      controller: "AccountingController",

      templateUrl: "accounting.html"
    })

};
module.exports.$inject = ["$stateProvider", "$urlRouterProvider"];