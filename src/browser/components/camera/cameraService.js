'use strict';
module.exports = function (Photo, $mdToast) {
  return {
    takePhoto: function () {
      return new Photo().$save().catch(function () {
        $mdToast.show(
          $mdToast.simple()
            .textContent("Fehler bei Bild Aufnahme! Überprüfe Verbindung oder Batterie der Kamera!")
            .position("top center")
            .hideDelay(3000)
        );
      });
    }
  };
};


module.exports.$inject = ["Photo", "$mdToast"];
