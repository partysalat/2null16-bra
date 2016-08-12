'use strict';
module.exports = {
  templateUrl: 'cameraButtonComponent.html',
  replace:true,
  controller: ["cameraService",function (cameraService) {
    this.takePhoto = cameraService.takePhoto;
  }]
};