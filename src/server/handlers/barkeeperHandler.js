'use strict';
var socket = require("./../socket");
var Images = require("./../models/Image"),
  _ = require("lodash"),
  promise = require("bluebird"),
  News = require("./../models/News");

module.exports.notify = function (request, reply) {
  reply("ok");
  socket.keeperStatus(request.params.keeper, request.params.status);
};

function createDrinkNews(image) {
  return News.create({
    imageId: image.id,
    type: News.NEWS_TYPES.IMAGE
  });
}
function pushNews(image, news) {
  socket.addNews([_.assign(news.dataValues, {image: image.dataValues})]);
}
module.exports.photo = function (request, reply) {

  return Images.create({
    path: request.params.imagePath,
  }).then(function (image) {
      return promise.all([
        image,
        createDrinkNews(image)
      ]);
    })
    .spread(pushNews)
    .then(function () {
      reply("ok");
    })
    .catch(function (err) {
      console.error(err);
      reply(err);
    });


};
