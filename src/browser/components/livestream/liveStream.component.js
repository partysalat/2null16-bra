'use strict';
module.exports = {
  templateUrl: 'liveStream.component.html',
  controller: ["socket", function (socket) {
    var $ctrl = this;
    socket.on("image.reload", reload);
    function reload() {
      $ctrl.imagePath = "http://bra/internal/live/stream.jpg?_=" + new Date().getTime();
    }
    reload();
  }]
};