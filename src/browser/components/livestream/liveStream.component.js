'use strict';
module.exports = {
  templateUrl: 'liveStream.component.html',
  controller: ["socket", function (socket) {
    var $ctrl = this;
    $ctrl.show = false;
    socket.on("image.reload", reload);
    function reload(base64Image) {
      $ctrl.hide = true;
      $ctrl.imagePath = "data:image/jpg;base64,"+base64Image;
    }
    reload();
  }]
};