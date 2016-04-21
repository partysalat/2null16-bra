'use strict';
var _ = require("lodash");

module.exports.sumStats = cacheResult(function sumStats(stats, key) {
    return _.reduce(stats, function (sum, val) {
      return sum + (val[key] || 0);
    }, 0);
  }
);


module.exports.dateBetween = function (from, to, now) {
  var current = new Date(now).getHours();
  return from <= current && current < to;
};

module.exports.alreadyGained = function (achievementList, name) {
  return _.find(achievementList, function (achievement) {
    return name === achievement.name;
  });
};

function cacheResult(fn){
  var cache = {};
  function clearCache(){
    cache = {};
  }
  return function(stats,key){
    if (!cache[key]) {
      cache[key] = fn(stats, key);
    }
    //wait next tick
    setTimeout(clearCache);
    //return cached result
    return cache[key];
  };
}

