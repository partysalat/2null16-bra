'use strict';
var
  Drink = require("./../models/Drink");



module.exports.getDrink = function (request, reply) {
  Drink.findAll({
    where: {
      type: Drink.DRINK_TYPES[request.params.type.toUpperCase()]
    }
  }).then(function (drinks) {
    reply({drinks: drinks});
  });
};



module.exports.saveDrink = function(request,reply){
  var name = request.payload.name;
  var type = request.params.type.toUpperCase();
  Drink.create({
    name:name,
    type:type
  }).then(reply).catch(function(err){
    console.log(err);
    reply(err);
  });
};

