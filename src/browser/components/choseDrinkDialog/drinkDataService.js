module.exports = function($q){
  return {
    getCocktails: function(){
        return $q.when(require("./mock/cocktails.json"))
    },
    getUsers: function(){
      return $q.when(require("./mock/user.json"))
    }
  }
};


module.exports.$inject = ["$q"];
