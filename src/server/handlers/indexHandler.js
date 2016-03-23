'use strict';
var config = require("./../../../localConfig"),
  sprintf = require("sprintf-js").sprintf;

module.exports = function (request, reply) {
  var bundleConfig = require("./../config/rev-manifest");
  reply.view("index", {
    documentBaseUrl: "/",
    bundleUrl: sprintf("%s/%s",config.bundle.url, bundleConfig[config.bundle.app] || config.bundle.app),
    vendorUrl: sprintf("%s/%s",config.bundle.url, bundleConfig[config.bundle.vendor] || config.bundle.vendor)
  });
};