"use strict";

console.log(parseInt(process.version.split(".")[0].split("v")[1]));
if (4 < parseInt(process.version.split(".")[0].split("v")[1])) {
  module.exports = true;
} else {
  module.exports = false;
}
