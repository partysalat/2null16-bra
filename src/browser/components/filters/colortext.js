'use strict';
module.exports = function($sce){
  return function(input){
    return $sce.trustAsHtml("<span class='colortext'>"+input+"</span>");
    // if(input){
    //   var inputArr = input.split("");
    //   var middleIndex = Math.round((inputArr.length-1)*0.5);
    //   if(inputArr.length>3){
    //     inputArr[middleIndex-1] = "<span class='colortext'>"+inputArr[middleIndex-1];
    //     inputArr[middleIndex+1] = inputArr[middleIndex+1] + "</span>";
    //   }else{
    //     inputArr[middleIndex] = "<span class='colortext'>"+inputArr[middleIndex]+"</span>";
    //   }
    //   return $sce.trustAsHtml(inputArr.join(""));
    // }

  };
};
module.exports.$inject = ["$sce"];