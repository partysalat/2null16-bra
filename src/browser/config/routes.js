'use strict';
module.exports = function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("news");
  $stateProvider
    .state('accounting', {
      url: "/accounting",
      controller: "AccountingController",

      templateUrl: "accounting.html"
    })
    .state('live', {
      url: "/live",
      controller: "LiveController",

      templateUrl: "live.html"
    })
    .state('news', {
      url: "/news",
      controller: "NewsController",
      controllerAs:"$ctrl",
      templateUrl: "news.html"
    });

};
module.exports.$inject = ["$stateProvider", "$urlRouterProvider"];