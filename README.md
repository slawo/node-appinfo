# node-appinfo

This npm module can automatically retrieve the information about the currently running node application.

[![License][npm-license-image]][npmjs-url]
[![Latest version on npm][npm-version-image]][npmjs-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][dependency-image]][dependency-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[![bitHound Overall Score][bithound-score-img]][bithound-url]
[![bitHound Dependencies][bithound-dependencies-img]][bithound-dependencies-url]
[![bitHound Dev Dependencies][bithound-devDependencies-img]][bithound-dependencies-url]

## Installation

    npm install --save node-appinfo

## Usage

    var appInfo = require("node-appinfo")();

Provides access to the following app information:

 - `name`: the application name
 - `version`: the version of the current application
 - `author`: the author's name
 - `description`: the description as set by the app's author

### setting info manually
You can set the path to the `package.json` file manually:

    var appInfo = require("node-appinfo")(__dirname);
    // if called from the project's root folder it wil load
    // data from the package.json

You can also send data to be manually set.

    var appInfo = require("node-appinfo")({
        name : "app1-manual"
        version : (require("./package.json").version)
    });

Currently this module will try to retrieve data from the `package.json` of the directory in which the main script resides.

## Limitations

If the script is launched with `mocha` or a manager like `pm2` the wrong path will be returned and the manager's application information will be returned.

## Changelog

* 0.2.3: Fixes tests.
* 0.2.2: Improves the detection of the current application
  - Relies more on cwd and require.main for app detection.
  - adds multiple testing scenarios.
* 0.2.1: Fixes a major bug when a folder path was passed to the module
* 0.2.0: Rewrite
  - Improves the detection of the package.json
  - Allows the use of a given path to retrieve the package.json
  - Allows setting-up the application information manually.
* 0.1.2: returns the author in the app information
* 0.1.1: documentation, travis, fixes for iojs
* 0.1.0: start

## License
The MIT License (MIT)
Copyright (c) 2016 Slawomir CALUCH

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[travis-image]: https://travis-ci.org/slawo/node-appinfo.svg?branch=master
[travis-url]: https://travis-ci.org/slawo/node-appinfo

[dependency-image]: https://img.shields.io/gemnasium/slawo/node-appinfo.svg
[dependency-url]: https://gemnasium.com/slawo/node-appinfo

[snyk-image]: https://snyk.io/test/github/slawo/node-appinfo/master/badge.svg
[snyk-url]: https://snyk.io/test/github/slawo/node-appinfo

[nodei-image]: https://nodei.co/npm/node-appinfo.png
[npmjs-url]: https://www.npmjs.com/package/node-appinfo

[npm-license-image]: https://img.shields.io/npm/l/node-appinfo.svg
[npm-version-image]: https://img.shields.io/npm/v/node-appinfo.svg

[bithound-score-img]: https://www.bithound.io/github/slawo/node-appinfo/badges/score.svg
[bithound-url]: https://www.bithound.io/github/slawo/node-appinfo

[bithound-dependencies-img]: https://www.bithound.io/github/slawo/node-appinfo/badges/dependencies.svg
[bithound-dependencies-url]: https://www.bithound.io/github/slawo/node-appinfo/master/dependencies/npm

[bithound-devDependencies-img]: https://www.bithound.io/github/slawo/node-appinfo/badges/devDependencies.svg
