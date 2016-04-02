'use strict';
module.exports = function () {
  return {
    createDrink:function(data){
      console.log(data)
    },
    createUser:function(data){
      console.log(data)
    }
  };
};


module.exports.$inject = ["$q"];
