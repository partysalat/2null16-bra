'use strict';
var _ = require("lodash");
module.exports = {
  templateUrl: 'bestlistDirective.html',
  controller: ["socket", "Bestlist", "Achievements", function (socket, Bestlist, Achievements) {
    var $ctrl = this;

    function getAchievements() {
      new Achievements().$get().then(function (achievements) {
        $ctrl.achievements = achievements;
        $ctrl.loaded = true;
      });
    }

    function getBestlist() {
      new Bestlist().$get().then(function (bestlist) {
        $ctrl.bestlist = bestlist.bestlist;
        $ctrl.loaded = true;
      });
    }

    function reloadBestlist() {
      getBestlist();
      getAchievements();
    }

    socket.on("news", _.debounce(reloadBestlist,1000,{trailing:true}));

    this.getAchievementForUser = function (userId) {
      return this.achievements ? this.achievements[userId] : {};
    };
    this.$onDestroy = function () {
      socket.off("news", reloadBestlist);
    };
    getBestlist();
    getAchievements();

  }]
};