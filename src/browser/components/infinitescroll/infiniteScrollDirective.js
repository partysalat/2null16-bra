'use strict';
module.exports = ["$window",function ($window) {
  return {
    link: function (scope, element, attrs) {
      var offset = parseInt(attrs.threshold) || 0;
      var e = element[0];

      angular.element($window).bind('scroll',checkIfShouldLoad );
      function checkIfShouldLoad() {
        if (scope.$eval(attrs.canLoad) && isElementVisible(e,$window,offset)) {
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