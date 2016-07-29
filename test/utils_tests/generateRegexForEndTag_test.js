var assert = require('chai').assert;
var ss = require('../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var utils = ss.utils;

module.exports = function () {
  describe("generateRegexForEndTag", function () {
    it("should generate regex to select an end tag with whitespace", function () {
      var scriptRe = utils.generateRegexForEndTag("script");

      var res = scriptRe.exec('</script >');
      assert.isOk(res.contains('</script >'));
    });

    it("should generate regex to select an end tag without whitespace", function () {
      var scriptRe = utils.generateRegexForEndTag("script");

      var res = scriptRe.exec('</script>');
      assert.isOk(res.contains('</script>'));
    });
  });
};