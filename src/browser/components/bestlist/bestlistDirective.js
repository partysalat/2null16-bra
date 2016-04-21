'use strict';
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

    socket.on("news", function () {
      getBestlist();
      getAchievements();
    });

    this.getAchievementForUser = function (userId) {
      return this.achievements ? this.achievements[userId] : {};
    };
    getBestlist();
    getAchievements();

  }]
};