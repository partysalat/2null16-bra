'use strict';
angular.module("app", [
    require("angular-resource"),

    require("angular-animate"),
    require("angular-aria"),
    require("angular-messages"),
    require("angular-material"),
    'ngMaterial',
    'ui.router',
    require("./components/choseDrinkDialog"),
    require("./components/createNewResource"),
    require("./components/users"),
    require("./components/filters"),
    require("./components/socketio"),
    require("./components/camera"),
    require("./components/cameraButton"),
    require("./components/refreshButton"),
    require("./components/infinitescroll"),
    require("./components/bestlist"),
    require("./components/revertDialog"),
    require("./components/news"),
    require("./components/keeperList"),
    require("./components/livestream")
  ])

  .controller("AccountingController", require("./sites/accounting/accountingController"))
  .controller("NewsController", require("./sites/news/newsController"))
  .controller("LiveController", require("./sites/live/liveController"))
  .config(require("./config/mdTheme"))
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }])
  .config(require("./config/routes"));