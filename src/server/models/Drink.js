'use strict';

var
  sequelize = require("./../db/sequelize"),
  DataType = require("sequelize"),
  TABLE_NAME = 'drinks',
  DRINK_TYPES_MAP = {
    COCKTAIL:"COCKTAIL",
    SHOT:"SHOT",
    BEER:"BEER",
    COFFEE:"COFFEE"
  },
  DRINK_TYPES = [DRINK_TYPES_MAP.COCKTAIL, DRINK_TYPES_MAP.SHOT, DRINK_TYPES_MAP.BEER, DRINK_TYPES_MAP.COFFEE];

var Drink = sequelize.get().define(TABLE_NAME, {
  name: DataType.STRING,
  ingredients:DataType.STRING,
  type: {
    type: DataType.ENUM,
    values: DRINK_TYPES,
    validate: {
      isIn: [DRINK_TYPES]
    }
  }
});


module.exports = Drink;
module.exports.DRINK_TYPES = DRINK_TYPES_MAP;