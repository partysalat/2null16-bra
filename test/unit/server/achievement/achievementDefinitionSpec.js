'use strict';
var _ = require("lodash");
describe('statusHandler', function () {
  var achievementDefinition;
  var TYPES;
  beforeEach(function () {
    TYPES = ["BEER","COFFEE","COCKTAIL","BEER"];
    achievementDefinition = require('../../../../src/server/achievements/achievementDefinition');
  });

  it('should be defined', function () {
    expect(achievementDefinition).toBeDefined();
  });
  //beer
  checkForAmountType("moe","BEER",1);
  checkForAmountType("lenny","BEER",5);
  checkForAmountType("carl","BEER",10);
  checkForAmountType("homer","BEER",15);
  checkForAmountType("barney","BEER",25);

  //coffee
  checkForAmountType("oeltanker","COFFEE",20);

  function checkForAmountType(achievement,type,amount) {
    describe(achievement, function () {
      var def;
      beforeEach(function () {
        def = achievementDefinition[achievement];
      });

      it('return true for gaining'+achievement, function () {
        expect(def.processor(
          getNewsForId("1", "DRINK", type),
          getUserStats("1", type,amount))).toBeTruthy();
      });
      it('return false for not gaining '+achievement, function () {
        expect(def.processor(
          getNewsForId("1", "DRINK", _(TYPES).pull(type).first()),
          getUserStats("1", type,amount))).toBeFalsy();
      });
      
    });
  }

  function getNewsForId(id, drinkType, drinkDetailType) {
    return {
      userId: id,
      type: drinkType,
      drink: {
        type: drinkDetailType
      }
    };
  }

  function getUserStats(id, type, counts) {
    return {
      "drinkCount": counts,
      "beerCount": type==="BEER"?counts:Math.ceil(Math.random()*30),
      "cocktailCount": type==="COCKTAIL"?counts:Math.ceil(Math.random()*30),
      "shotCount": type==="SHOT"?counts:Math.ceil(Math.random()*30),
      "coffeeCount": type==="COFFEE"?counts:Math.ceil(Math.random()*30),
      "user": {"id": id}
    };
  }


});
