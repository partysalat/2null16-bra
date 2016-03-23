'use strict';

module.exports = function (versionService) {

  return {
    scope: {},
    templateUrl: 'versionDirective.html',
    controller: function () {
      this.version = versionService.getVersion();
    },
    controllerAs:"ctrl",
    bindToController: true
  };
};
module.exports.$inject = ["versionService"];