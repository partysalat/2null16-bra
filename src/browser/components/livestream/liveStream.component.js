'use strict';
module.exports = {
  templateUrl: 'liveStream.component.html',
  controller: ["socket", function (socket) {
    var $ctrl = this;
    $ctrl.show = false;
    socket.on("image.reload", reload);
    function reload(base64Image) {
      if(!base64Image){
        return;
      }
      $ctrl.show = true;
      $ctrl.imagePath = "data:image/jpg;base64,"+base64Image;
    }
    reload();
    $ctrl.$onDestroy = function () {
      socket.off("image.reload",reload);
    };

  }]
};