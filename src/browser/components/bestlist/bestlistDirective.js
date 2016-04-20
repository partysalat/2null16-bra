'use strict';
module.exports = {
  templateUrl: 'bestlistDirective.html',
  controller: ["socket", "Bestlist", "Achievements", function (socket, Bestlist, Achievements) {
    var self = this;
    function getAchievements() {
      new Achievements().$get().then(function (achievements) {
        self.achievements = achievements;
      });
    }

    function getBestlist() {
      new Bestlist().$get().then(function (bestlist) {
        self.bestlist = bestlist.bestlist;
      });
    }

    socket.on("news", function (data) {
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