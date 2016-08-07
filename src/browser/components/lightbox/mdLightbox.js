'use strict';
module.exports = ['$mdDialog', function($mdDialog){
  return {
    link: function($scope, elem, attrs){

      elem.addClass('image-click');

      elem.on('click',function(){
        var image = attrs.src;
        var title = attrs.mdLightboxTitle;
        showLightboxModal(image, title);

      });

      //Lightbox Modal
      function showLightboxModal(image, title) {
        var confirm = $mdDialog.confirm({
          templateUrl: 'screenshot.html',
          clickOutsideToClose: true,
          controller: ["$scope", "$mdDialog",lightboxController]
        });

        $mdDialog.show(confirm);

        function lightboxController($scope, $mdDialog) {
          $scope.image = image.replace("_min","");
          $scope.title = title;

          $scope.cancel = function() {
            $mdDialog.cancel();
          };

        }

      }
    }
  };
}];