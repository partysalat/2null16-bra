'use strict';
var socket = require("./../socket");
var rp = require("request-promise");
var Images = require("./../models/Image"),
  _ = require("lodash"),
  promise = require("bluebird"),
  News = require("./../models/News");

module.exports.notify = function (request, reply) {
  reply("ok");
  socket.keeperStatus(request.payload);
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
function photo(img) {

  return Images.create({
    path: img.filename
  }).then(function (image) {
    return promise.all([
      image,
      createDrinkNews(image)
    ]);
  })
    .spread(pushNews);

}
module.exports.takephoto = function (request, reply) {

  return rp({
    method: "POST",
    url: "http://localhost:1338/api/camera/shot",
    json: true
  })
    .then(photo)
    .then(function () {
      reply("ok");
    })
    .catch(function (err) {
      console.error(err);
      if (!err.statusCode || err.statusCode >= 500) {
        reply(err);
        return;
      }
      reply().code(400);

    });


};

