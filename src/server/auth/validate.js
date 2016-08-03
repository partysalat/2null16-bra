'use strict';

var Bcrypt = require("bcrypt");
var myPassword = "$2a$10$SgpAuOzRHf/gA8MZHArlTenW9xBeWjuo89.pzRDPQKxUQxvmKgdIG";

module.exports = function (request, username, password, callback) {

  if (username !== "bra") {
    return callback(null, false);
  }

  Bcrypt.compare(password, myPassword, function (err, isValid) {
    callback(err, isValid, {});
  });
};