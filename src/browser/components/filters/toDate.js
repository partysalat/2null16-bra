'use strict';
module.exports = function () {
  return function (input) {
    if (input) {
      var arr = input.split(/[- :]/);

      var convertedDate =  new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
      return convertedDate.getTime()?convertedDate: new Date(input);
    }

  };
};
module.exports.$inject = [];