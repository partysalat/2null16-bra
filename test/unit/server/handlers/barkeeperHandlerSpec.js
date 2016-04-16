'use strict';
var rewire = require("rewire"),
  promise = require("bluebird");
describe('statusHandler', function () {
  var barkeeperHandler,
    ImagesMock,
    imageMock,
    newsMock,
    socketMock,
    NewsMock,
    rpMock;
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
    rpMock = jasmine.createSpy("request-promise");


    barkeeperHandler = rewire('../../../../src/server/handlers/barkeeperHandler');
    barkeeperHandler.__set__("Images", ImagesMock);
    barkeeperHandler.__set__("News", NewsMock);
    barkeeperHandler.__set__("socket", socketMock);
    barkeeperHandler.__set__("rp", rpMock);
  });

  it('should be defined', function () {
    expect(barkeeperHandler).toBeDefined();
  });

  it('should reply with ok, creates image and news and push it via websocket', function (done) {
    var replySpy = jasmine.createSpy('reply');
    var IMAGE_PATH = "FOOO";
    rpMock.and.returnValue(promise.resolve({filename:IMAGE_PATH}));
    barkeeperHandler.takephoto({params: {imagePath: IMAGE_PATH}}, replySpy)
      .then(function () {
        expect(ImagesMock.create).toHaveBeenCalledWith({
          path: IMAGE_PATH
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
