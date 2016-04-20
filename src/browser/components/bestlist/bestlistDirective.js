'use strict';
module.exports = {
  templateUrl: 'bestlistDirective.html',
  controller: [function () {
    this.getAchievementForUser = function(userId){
      return this.achievements?this.achievements[userId]:{};
    };
  }],
  bindings: {
    list:"=",
    achievements:"="
  }
};