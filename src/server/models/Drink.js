'use strict';

var
  sequelize = require("./../db/sequelize"),
  DataType = require("sequelize"),
  TABLE_NAME = 'drinks',
  DRINK_TYPES_MAP = {
    COCKTAIL:"COCKTAIL",
    SHOT:"SHOT",
    BEER:"BEER",
    COFFEE:"COFFEE",
    SOFTDRINK:"SOFTDRINK",
  },
  DRINK_TYPES = [DRINK_TYPES_MAP.COCKTAIL, DRINK_TYPES_MAP.SHOT, DRINK_TYPES_MAP.BEER, DRINK_TYPES_MAP.COFFEE,DRINK_TYPES_MAP.SOFTDRINK];

var Drink = sequelize.get().define(TABLE_NAME, {
  name: DataType.STRING,
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataType.ENUM,
    values: DRINK_TYPES,
    validate: {
      isIn: [DRINK_TYPES]
    }
  }
});
Drink.sync();

module.exports = Drink;
module.exports.DRINK_TYPES = DRINK_TYPES_MAP;
module.exports.DRINK_TYPES_ARR = DRINK_TYPES;