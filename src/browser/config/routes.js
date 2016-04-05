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
      resolve:{
        news:["News",function(News){
          return new News().$get();
        }]
      },
      templateUrl: "news.html"
    });

};
module.exports.$inject = ["$stateProvider", "$urlRouterProvider"];