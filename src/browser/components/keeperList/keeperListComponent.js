'use strict';
var barkeepers = require("./barkeepers.json").barkeepers;
module.exports = {
  templateUrl: 'keeperListComponent.html',
  replace:true,
  controller: ["socket",function (socket) {
    var MAX_DISTANCE = 15;
    this.isActive = {};
    this.distance = {};
    this.barkeepers = barkeepers;
    socket.on("keeper", function (data) {
      this.isActive[data.name] = typeof data.distance === "number" && data.distance< MAX_DISTANCE;
      this.distance[data.name] = Math.round(data.distance);
      //$scope.$apply();
    }.bind(this));

  }]
};