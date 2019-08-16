"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0,
_express2.default)(); /* eslint-disable node/no-unsupported-features/es-syntax */

var PORT = process.env.PORT || 5000;

app.get("/", function(req, res) {
  res.send("App Working");
});

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});
