'use strict';
var
  promise = require("bluebird");
  
describe('barkeeperHandler', function () {
  var server,
    News = require("./../../../src/server/models/News"),
    User = require("./../../../src/server/models/User"),
    Drinks = require("./../../../src/server/models/Drink"),
    Images = require("./../../../src/server/models/Image");
  beforeEach(function (done) {
    promise.all([
        News.sync({force: true}),
        Images.sync({force: true}),
        Drinks.sync({force: true}),
        User.sync({force: true})
      ])
      .then(function () {
        require('../../../src/server').create({
          port: 12345
        }, function (err, serverInstance) {
          server = serverInstance;
          done();
        }.bind(this));
      });

  });

  it('should reply with ok, creates image and news', function (done) {
    var IMAGE_PATH = "123";
    server.inject({
      url: "/api/photo/" + IMAGE_PATH,
      method: "POST"
    }, function (response) {
      expect(response.payload).toBe("ok");
      promise.all([
        News.findAll(),
        Images.findAll()
      ]).spread(function (news, images) {
        expect(news.length).toBe(1);
        expect(images.length).toBe(1);
        expect(news[0].imageId).toBe(images[0].id);
        done();
      });

    });
  });

});
