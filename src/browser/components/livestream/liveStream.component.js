'use strict';
module.exports = {
  templateUrl: 'liveStream.component.html',
  controller: ["socket", function (socket) {
    var $ctrl = this;
    socket.on("image.reload", reload);
    function reload(base64Image) {
      $ctrl.imagePath = "data:image/jpg;base64,"+base64Image;
    }
    reload();
  }]
};