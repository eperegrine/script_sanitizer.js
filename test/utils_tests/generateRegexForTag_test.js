var assert = require('chai').assert;
var ss = require('../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var utils = ss.utils;

module.exports = function () {
  describe("generateRegexForTag", function () {
    it("should generate regex to select a tag and it's content without whitespace", function () {
      var scriptRe = utils.generateRegexForTag("script");

      var res = scriptRe.exec('<script>alert(\'hi\');</script>');
      assert.isOk(res.contains('<script>alert(\'hi\');</script>'));
    });
    it("should generate regex to select a tag and it's content with whitespace", function () {
      var scriptRe = utils.generateRegexForTag("script");

      var res = scriptRe.exec('<script href=\'\'  >alert(\'hi\');</script   >');
      assert.isOk(res.contains('<script href=\'\'  >alert(\'hi\');</script   >'));
    });
  });
};