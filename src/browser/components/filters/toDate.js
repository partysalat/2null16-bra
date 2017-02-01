'use strict';
var _ = require("lodash");
module.exports = function () {
  return function (input) {
    if (input) {
      var convertedDate;
      if(!_.isNumber(input)){
        var arr = input.split(/[- :]/);
        convertedDate =  new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
      }else {
        convertedDate = new Date(input);
      }

      return convertedDate.getTime()?convertedDate: new Date(input);
    }

  };
};
module.exports.$inject = [];