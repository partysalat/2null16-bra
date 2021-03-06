'use strict';
var _ = require("lodash");
module.exports = ["$window","$timeout",function ($window,$timeout) {
  return {
    link: function (scope, element, attrs) {
      var offset = parseInt(attrs.threshold) || 0;
      var e = element[0];

      var containerElement;
      $timeout(function(){
        containerElement = attrs.containerElement?document.querySelector(attrs.containerElement):$window;
        angular.element(containerElement).bind('scroll',_.throttle(checkIfShouldLoad,300) );
      });
      function checkIfShouldLoad() {
        if (scope.$eval(attrs.canLoad) && isElementVisible(e,containerElement,offset)) {
          scope.$apply(attrs.infiniteScroll);
        }
      }
    }
  };
}];
function isElementVisible(waypointElement, scrollContainer,offset) {
  var
    scrollPositionY = scrollContainer.scrollTop || scrollContainer.scrollY || scrollContainer.pageYOffset,
    scrollContainerHeight = scrollContainer.offsetHeight || scrollContainer.innerHeight;

  if (waypointElement.offsetTop + waypointElement.offsetHeight < scrollPositionY) {
    return false;
  }
  return waypointElement.offsetTop - offset <= scrollPositionY + scrollContainerHeight;
}