"use strict";

var expect = require("chai").expect;

var os = require("os");
var fs = require("fs-extra");
var path = require("path");

var exec = require("child_process").exec;
var mkdirp = require("mkdirp");

var logger = require("../../src/logger");


module.exports = function (scenarioName) {
  var s = {};

  var tmpdir = os.tmpdir();
  var rootPath = path.join(__dirname, "..", "scenarios", scenarioName);
  var destPath = path.join(tmpdir, scenarioName);
  var testedModulePath = path.join(__dirname, "..", "..");
  var scenario = require(path.join(rootPath, "scenario"));
  s.controlPackage = {};
  s.controlPackage.path =  path.join(rootPath, "app", "package.json");
  s.controlPackage.data =  require(s.controlPackage.path);

  var module_destination = "app";

  if("undefined" !== scenario.module_destination && scenario.module_destination) {
    module_destination = scenario.module_destination;
  }

  var modulesPath = path.join(destPath, module_destination,  "node_modules");
  var destModulePath = path.join(modulesPath, "node-appinfo");

  describe("Run Scenario: " + scenario.name + ".", function() {
  
    before("Has created the folder.", function(done) {
      mkdirp(destPath, function(err) {
        expect(fs.existsSync(destPath)).to.be.true;
        done(err);
      });
    });

    before("Has copied the files.", function(done) {
      logger.log("Copying files:", rootPath, " to ", destPath);
      var copyOptions = {clobber:true, preserveTimestamps:true};
      fs.copy(rootPath, destPath, copyOptions, function (err) {
        if (err) {
          logger.log("err:", err);
          done(err);
        }
        else {
          expect(fs.existsSync(destPath)).to.be.true;
          done();
        }
      });
    });

    before("Copy the module.", function(done) {
      this.timeout(5000);
      this.slow(2000);
      mkdirp(destModulePath, function(err) {
        if (err) {
          return done(err);
        }
        expect(fs.existsSync(destModulePath)).to.be.true;

        var filterout_m = path.join(testedModulePath, "node_modules");
        var filterout_g = path.join(testedModulePath, ".git");

        logger.log("filterout_m:", filterout_m);
        var filter = function (filename) {
          return !filename.startsWith(filterout_m) 
          && !filename.startsWith(filterout_g);
        };

        var copyOptions = {clobber:true, preserveTimestamps:true, filter:filter};
        logger.log("Copying files: ", testedModulePath, " to ", destModulePath);

        fs.copy(testedModulePath, destModulePath, copyOptions, function (err) {
          logger.log("ncp done: ", err);
          if (err) {
            done(err);
          }
          else {
            expect(fs.existsSync(path.join(destModulePath, "package.json"))).to.be.true;
            done();
          }
        });
      });
    });

    before("has copied the module.", function() {
      expect(fs.existsSync(destModulePath)).to.be.true;
    });


    for(var runKey in scenario.run) {
      var run = scenario.run[runKey];
      var pwd = path.join(destPath, run.pwd);
      var cmd = run.run;

      describe(" Exec: " + run.name + ".", function() {
        let appInfo;
        before("has run successfully.", function(done) {

          function handleAppResult(error, stdout, stderr) {
            if (error) {
              done(error);
            }
            else {
              expect(stderr).to.be.empty;
              expect(stdout).to.not.be.empty;
              var jsonStart = stdout.indexOf("{");
              var appJson = stdout.substring(jsonStart);

              logger.log("JSON.parse: ", appJson);
              var appData = JSON.parse(appJson);
              logger.log(appData);
              expect(appData).to.haveOwnProperty("name");
              expect(appData).to.haveOwnProperty("version");

              appInfo = appData;
                
              done();
            }
          }
          exec("cd "+pwd+";"+cmd, handleAppResult);
        });
    
        it("has the right name.", function() {
          expect(appInfo.name).to.equal(scenarioName);
        });
    
        it("has the right version.", function() {
          expect(appInfo.version).to.equal(s.controlPackage.data.version);
        });
    
        it("has the right author.", function() {
          expect(appInfo.author).to.equal(s.controlPackage.data.author);
        });
    
        it("has the right description.", function() {
          expect(appInfo.description).to.equal(s.controlPackage.data.description);
        });
      });

    }

    after(function () {
      deleteFolderRecursive(destPath);
    });
  });
};


var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
