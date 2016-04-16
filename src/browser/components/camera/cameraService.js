'use strict';
module.exports = function (Photo) {
  return {
    takePhoto: function () {
      return new Photo().$save();
    }
  };
};


module.exports.$inject = ["Photo"];
