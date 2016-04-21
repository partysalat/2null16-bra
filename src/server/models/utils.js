'use strict';

var flatten =require("flatten.js");
var _ = require("lodash");
module.exports.convertRawToJson = function convertRawToJson(input) {
  return input.map(_.unary(flatten.expand));
};
