'use strict';

var flatten =require("flatten.js");
module.exports.convertRawToJson = function convertRawToJson(input) {
  return input.map(function(item){
    return flatten.expand(item);
  });
};
