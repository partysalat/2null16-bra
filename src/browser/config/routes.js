'use strict';
module.exports = function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/news");
  $stateProvider
    .state('accounting', {
      url: "/accounting",
      controller: "AccountingController",

      templateUrl: "accounting.html"
    })
    .state('news', {
      url: "/news",
      controller: "NewsController",
      templateUrl: "news.html"
    });

};
module.exports.$inject = ["$stateProvider", "$urlRouterProvider"];