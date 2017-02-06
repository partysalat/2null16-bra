'use strict';
var _ = require("lodash");
module.exports = function ($window,$scope) {
  var mq = $window.matchMedia( "(min-width: 600px)" );
  var $ctrl = this;
  $ctrl.isDesktop = mq.matches;
  $window.addEventListener("resize",_.throttle(function(){
    $ctrl.isDesktop = mq.matches;
    $scope.$digest();
  },200))

};

module.exports.$inject = ["$window","$scope"];