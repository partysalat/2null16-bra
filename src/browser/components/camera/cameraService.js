'use strict';
module.exports = function (Photo, $mdToast,$http) {

  function errorHandler(err){
      if(err.status >= 500){
        $mdToast.show(
          $mdToast.simple()
            .textContent("Fehler")
            .position("top center")
            .hideDelay(3000)
        );
      }
  }

  return {
    takePhoto: function () {
      return new Photo().$save().catch(errorHandler);
    },
    startCam: function(){
      return $http.post("/api/photo/stream/start").catch(errorHandler)
    },
    stopCam:function(){
      return $http.post("/api/photo/stream/stop").catch(errorHandler)
    }


  };
};


module.exports.$inject = ["Photo", "$mdToast","$http"];
