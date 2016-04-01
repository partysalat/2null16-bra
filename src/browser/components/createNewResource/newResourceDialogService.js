'use strict';
module.exports = function ($q) {
  return {
    openNewUser:function(){
      console.log("NEw user")
    },
    openNewDrink:function(){
      console.log("new drink")
    }
  };
};


module.exports.$inject = ["$q"];
