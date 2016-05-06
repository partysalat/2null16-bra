'use strict';
/**
 *
 * Description for achievements (maybe some kind of DSL?). The Name, the description and the image will be
 * written to database when calling /internal/sync/achievements.
 *
 * The processor function is evaluated for each user and gets (for now) 4 parameters:
 *  - news: the current drinking news item (drink.name,drink.type,userId) @see models/News.js
 *  - userStats: the statistics for current user (drinkCount,cocktailCount,shotCount,beerCount,coffeeCount) @see models/News.js
 *  - achievements: the already gained achievements (Array<Achievements>)
 *  - usersStats: array of userStats from all drinkers
 *
 */

var utils = require("./utils");

module.exports = {
  /**
   * Beer
   */
  moe: {
    name: "Moe",
    description: "1 Bier bestellt",
    image: "/internal/assets/achievements/moe.png",
    processor: function (news, userStats) {
      return news.drink.type === "BEER" && userStats.beerCount >= 1;
    }
  },
  lenny: {
    name: "Lenny",
    description: "5 Bier bestellt",
    image: "/internal/assets/achievements/lenny.png",
    processor: function (news, userStats) {
      return news.drink.type === "BEER" && userStats.beerCount >= 5;
    }
  },
  carl: {
    name: "Carl",
    description: "10 Bier bestellt",
    image: "/internal/assets/achievements/carl.png",
    processor: function (news, userStats) {
      return news.drink.type === "BEER" && userStats.beerCount >= 10;
    }
  },
  homer: {
    name: "Homer",
    description: "15 Bier bestellt",
    image: "/internal/assets/achievements/homer.png",
    processor: function (news, userStats) {
      return news.drink.type === "BEER" && userStats.beerCount >= 15;
    }
  },
  barney: {
    name: "Barney",
    description: "25 Bier bestellt",
    image: "/internal/assets/achievements/barney.png",
    processor: function (news, userStats) {
      return news.drink.type === "BEER" && userStats.beerCount >= 25;
    }
  },
  /**
   * Cocktails
   */

  jeffLebowski: {
    name: "Jeff Lebowski",
    description: "1 Cocktails bestellt",
    image: "/internal/assets/achievements/derdude.jpg",
    processor: function (news, userStats) {
      return news.drink.type === "COCKTAIL" && userStats.cocktailCount >= 1;
    }
  },
  hemingway: {
    name: "Hemingway",
    description: "5 Cocktails bestellt",
    image: "/internal/assets/achievements/hemingway.jpg",
    processor: function (news, userStats) {
      return news.drink.type === "COCKTAIL" && userStats.cocktailCount >= 5;
    }
  },
  churchill: {
    name: "Churchill",
    description: "10 Cocktails bestellt",
    image: "/internal/assets/achievements/churchill.jpg",
    processor: function (news, userStats) {
      return news.drink.type === "COCKTAIL" && userStats.cocktailCount >= 10;
    }
  },
  georgeRRMartin: {
    name: "George R.R.Martin",
    description: "15 Cocktails bestellt",
    image: "/internal/assets/achievements/georgeRRMartin.jpg",
    processor: function (news, userStats) {
      return news.drink.type === "COCKTAIL" && userStats.cocktailCount >= 15;
    }
  },

  /**
   * Timing
   */
  frueheVogel: {
    name: "Der frühe Vogel trinkt Bier",
    description: "Bier vor 12 Uhr morgens",
    image: "/internal/assets/achievements/frueherVogel.png",
    processor: function (news) {
      return news.drink.type === "BEER" &&
        utils.dateBetween(8, 12, news.createdAt);
    }
  },
  derAbendKannKommen: {
    name: "Der Abend kann kommen",
    description: "Alkoholisches Getränk am frühen Abend (18 Uhr bis 20 Uhr) bestellt",
    image: "/internal/assets/achievements/derAbendKannKommen.jpg",
    processor: function (news) {
      return (news.drink.type === "BEER" || news.drink.type === "SHOT" || news.drink.type === "COCKTAIL") &&
        utils.dateBetween(18, 20, news.createdAt);
    }
  },
  einerDerLetztenKunden: {
    name: "Einer der letzten Kunden",
    description: "Alkoholisches Getränk zwischen 4 Uhr bis 8 Uhr bestellt",
    image: "/internal/assets/achievements/einerDerLetztenKunden.jpg",
    processor: function (news) {
      return (news.drink.type === "BEER" || news.drink.type === "SHOT" || news.drink.type === "COCKTAIL") &&
        utils.dateBetween(4, 8, news.createdAt);
    }
  },
  /**
   * Einmalig
   */
  glueckspils: {
    name: "Glückspils",
    description: "25. Bier bestellt",
    image: "/internal/assets/achievements/glueckspils.png",
    processor: function (news, userStats, achievements, usersStats) {
      return news.drink.type === "BEER" && utils.sumStats(usersStats, "beerCount") === 25;
    }
  },
  esGehtSeinenGang: {
    name: "Es geht seinen Gang",
    description: "50. Bier bestellt",
    image: "/internal/assets/achievements/esgehtseinengang.png",
    processor: function (news, userStats, achievements, usersStats) {
      return news.drink.type === "BEER" && utils.sumStats(usersStats, "beerCount") === 50;
    }
  },
  venividibieri: {
    name: "Veni Vidi Bieri",
    description: "100. Bier bestellt",
    image: "/internal/assets/achievements/venividibieri.png",
    processor: function (news, userStats, achievements, usersStats) {
      return news.drink.type === "BEER" && utils.sumStats(usersStats, "beerCount") === 100;
    }
  },
  halbzeit: {
    name: "Halbzeit",
    description: "150. Bier bestellt",
    image: "/internal/assets/achievements/halbzeit.png",
    processor: function (news, userStats, achievements, usersStats) {
      return news.drink.type === "BEER" && utils.sumStats(usersStats, "beerCount") === 150;
    }
  },
  sparta: {
    name: "This is Sparta!",
    description: "300. Bier bestellt",
    image: "/internal/assets/achievements/thisissparta.png",
    processor: function (news, userStats, achievements, usersStats) {
      return news.drink.type === "BEER" && utils.sumStats(usersStats, "beerCount") === 300;
    }
  },
  /**
   * Kaffee
   */
  oeltanker: {
    name: "Öltanker",
    description: "20 Kaffee bestellt",
    image: "/internal/assets/achievements/oeltanker.jpg",
    processor: function (news, userStats) {
      return news.drink.type === "COFFEE" && userStats.coffeeCount >= 20;
    }
  },
  /**
   * Shot runden
   */

  dieNaechsteRundeGehtAufMich: {
    name: "Die nächste Runde geht auf mich",
    description: "Mindestens 10 Shots auf einmal bestellt",
    image: "/internal/assets/achievements/dienaechsterundegehtaufmich.jpg",
    processor: function (news) {
      return news.drink.type === "SHOT" && news.cardinality >= 10;
    }
  },
  neRundeFuerAll: {
    name: "'ne Runde für alle!",
    description: "Mindestens 20 Shots auf einmal bestellt",
    image: "/internal/assets/achievements/nerundefueralle.jpg",
    processor: function (news) {
      return news.drink.type === "SHOT" && news.cardinality >= 20;
    }
  },
  /**
   * Mix
   */
  raufUndRunter: {
    name: "Rauf und runter",
    description: "Jeweils ein Bier, Shot und Cocktail bestellt",
    image: "/internal/assets/achievements/raufUndRunter.jpg",
    processor: function (news, userStats) {
      return userStats.beerCount > 0 && userStats.cocktailCount > 0 && userStats.shotCount > 0;
    }
  }
};