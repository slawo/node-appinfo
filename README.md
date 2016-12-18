#node-appinfo

This npm module retrieves automatically the information about the currently running node application.

[![Build Status][travis-image]][travis-url]
[![Dependency Status][dependency-image]][dependency-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[![npm stats][nodei-image]][npmjs-url]

##Installation

    npm install --save node-appinfo

##Usage

    var appInfo = require("node-appinfo");

Provides access to the following app information

 - `name`: the application name
 - `version`: the version of the current application
 - `description`: the description as set by the app's author


Currently this module will try to retrieve data from the `package.json` of the directory in which the main script resides.

##Limitations

If the script is launched with `mocha` or a manager like `pm2` the wrong path will be returned and the manager's application information will be returned.

## Changelog

* 0.1.1: documentation, travis, fixes for iojs
* 0.1.0: start

##License
The MIT License (MIT)
Copyright (c) 2016 Slawomir CALUCH

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[travis-image]: https://travis-ci.org/slawo/node-appinfo.svg?branch=develop
[travis-url]: https://travis-ci.org/slawo/node-appinfo

[dependency-image]: https://img.shields.io/gemnasium/slawo/node-appinfo.svg
[dependency-url]: https://gemnasium.com/slawo/node-appinfo

[snyk-image]: https://snyk.io/test/github/slawo/node-appinfo/develop/badge.svg
[snyk-url]: https://snyk.io/test/github/slawo/node-appinfo

[nodei-image]: https://nodei.co/npm/node-appinfo.png
[npmjs-url]: https://www.npmjs.com/package/node-appinfo
