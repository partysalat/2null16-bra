'use strict';

var _ =require("lodash");
module.exports.convertRawToJson = function convertRawToJson(input, result) {
  if (!result) {
    result = [];
  }
  _.forIn(input, function (value, key) {
    if (_.isArray(input)) {
      result.push(convertRawToJson(value, {}));
    }
    if (_.isObject(value)) {
      convertRawToJson(value, result);
    } else {
      _.set(result, key, value);
    }
  });
  return result;
};
