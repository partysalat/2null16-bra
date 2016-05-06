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
  moe: {
    name: "Moe",
    description: "1 Bier bestellt",
    image: "/internal/assets/achievements/moe.png",
    processor: function (news, userStats) {
      return news.drink.type === "BEER" && userStats.beerCount === 1;
    }
  },
  lenny: {
    name: "Lenny",
    description: "5 Bier bestellt",
    image: "/internal/assets/achievements/lenny.png",
    processor: function (news, userStats) {
      return news.drink.type === "BEER" && userStats.beerCount === 5;
    }
  },
  carl: {
    name: "Carl",
    description: "10 Bier bestellt",
    image: "/internal/assets/achievements/carl.png",
    processor: function (news, userStats) {
      return news.drink.type === "BEER" && userStats.beerCount === 10;
    }
  },
  homer: {
    name: "Homer",
    description: "15 Bier bestellt",
    image: "/internal/assets/achievements/homer.png",
    processor: function (news, userStats) {
      return news.drink.type === "BEER" && userStats.beerCount === 15;
    }
  },
  barney: {
    name: "Barney",
    description: "25 Bier bestellt",
    image: "/internal/assets/achievements/barney.png",
    processor: function (news, userStats) {
      return news.drink.type === "BEER" && userStats.beerCount === 25;
    }

  },
  frueheVogel: {
    name: "Der frühe Vogel trinkt Bier",
    description: "Bier vor 12 Uhr morgens",
    image: "/internal/assets/achievements/frueherVogel.png",
    processor: function (news, userStats, achievements) {
      return news.drink.type === "BEER" &&
        utils.dateBetween(8, 12, news.createdAt) && !utils.alreadyGained(achievements, this.name);
    }
  },
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

  oeltanker: {
    name: "Öltanker",
    description: "20 Kaffee bestellt",
    image: "/internal/assets/achievements/oeltanker.png",
    processor: function (news, userStats) {
      return news.drink.type === "COFFEE" && userStats.coffeeCount === 20;
    }
  },
  dieNaechsteRundeGehtAufMich: {
    name: "Die nächste Runde geht auf mich",
    description: "Mindestens 10 Shots auf einmal bestellt",
    image: "/internal/assets/achievements/dienaechsterundegehtaufmich.jpg",
    processor: function (news, userStats, achievements) {
      return !utils.alreadyGained(achievements, this.name) &&
        news.drink.type === "SHOT" &&
        news.cardinality > 10;
    }
  }
};