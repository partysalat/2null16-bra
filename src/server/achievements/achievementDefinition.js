'use strict';
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
  oeltanker: {
    name: "Öltanker",
    description: "20 Kaffee bestellt",
    image: "/internal/assets/achievements/oeltanker.png",
    processor: function (news, userStats) {
      return news.drink.type === "COFFEE" && userStats.coffeeCount === 20;
    }
  }
};