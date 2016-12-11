#node-appinfo

This module retrieves automatically the information about the currently running application.

##Installation

    npm install node-appinfo;

##Usage

    var appInfo = require("node-appinfo");

Provides access to the following app information

 - `name`: the application name
 - `version`: the version of the current application
 - `description`: the description as set by the app's author


Currently this module will try to retrieve data from the `package.json` of the directory from which the main script has been launched.

##License
MIT
