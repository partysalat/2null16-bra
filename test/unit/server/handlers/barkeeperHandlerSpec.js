'use strict';
var rewire = require("rewire"),
  promise = require("bluebird");
describe('statusHandler', function () {
  var barkeeperHandler,
    ImagesMock,
    imageMock,
    newsMock,
    socketMock,
    NewsMock;
  beforeEach(function () {
    imageMock = {
      id: "123467",
      dataValues: {
        Baz: "quux"
      }
    };
    newsMock = {
      dataValues: {
        FOO: "Bar"
      }
    };
    ImagesMock = jasmine.createSpyObj("Images", ["create"]);
    ImagesMock.create.and.returnValue(promise.resolve(imageMock));
    NewsMock = jasmine.createSpyObj("News", ["create"]);
    NewsMock.NEWS_TYPES = {IMAGE: "IMAGE"};
    NewsMock.create.and.returnValue(promise.resolve(newsMock));
    socketMock = jasmine.createSpyObj("socket", ["addNews"]);

    barkeeperHandler = rewire('../../../../src/server/handlers/barkeeperHandler');
    barkeeperHandler.__set__("Images", ImagesMock);
    barkeeperHandler.__set__("News", NewsMock);
    barkeeperHandler.__set__("socket", socketMock);
  });

  it('should be defined', function () {
    expect(barkeeperHandler).toBeDefined();
  });

  it('should reply with ok, creates image and news and push it via websocket', function (done) {
    var replySpy = jasmine.createSpy('reply');
    var IMAGE_PATH = "FOOO";
    var KEEPER = "Kepper";
    barkeeperHandler.photo({params: {imagePath: IMAGE_PATH,keeper:KEEPER}}, replySpy)
      .then(function () {
        expect(ImagesMock.create).toHaveBeenCalledWith({
          path: IMAGE_PATH,
          keeper:KEEPER
        });
        expect(NewsMock.create).toHaveBeenCalledWith({
          imageId: imageMock.id,
          type: "IMAGE"
        });
        expect(socketMock.addNews).toHaveBeenCalledWith([{
          FOO: "Bar", image: imageMock.dataValues
        }]);

        expect(replySpy).toHaveBeenCalledWith('ok');
        done();
      });

  });
});
