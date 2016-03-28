angular.module("chose-drink",[
  "templates"
])
  
.service("drinkDataService",require("./drinkDataService"))
.service("drinkDialogService",require("./drinkDialogService"));

module.exports = "chose-drink";