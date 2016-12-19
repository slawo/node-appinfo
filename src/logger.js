"use strict";

var log = function () {

};
var info = function () {
    
};
var warn = function () {
    
};
var error = function () {
    
};

switch (process.env.NODE_ENV) {
case "test":
  /*eslint-disable no-console */
  log = console.log;
  info = console.info;
  warn = console.warn;
  error = console.error;
  /*eslint-enable no-console */
  break;
}

module.exports = {
  log:log,
  info:info,
  warn:warn,
  error:error,
};
