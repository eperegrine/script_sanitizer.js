var assert = require('chai').assert;
var ss = require('../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var utils = ss.utils;

module.exports = function () {
  describe("generateRegexForTag", function () {
    it("should generate regex to select an attribute", function () {
      var scriptRe = utils.generateRegexForAttribute("onload");

      var res = scriptRe.exec("<div onload=\"alert(\'Hi\')\"></div>");
      assert.isOk(res.contains('onload="alert(\''));
    });
    it("should still work with single quotes", function () {
      var scriptRe = utils.generateRegexForAttribute("onload");

      var res = scriptRe.exec("<div onload=\'alert(\'Hi\')\'></div>");
      assert.isOk(res.contains('onload=\'alert(\''));
    });
  });
};