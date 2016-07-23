var assert = require('chai').assert;
var ss = require('../../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var script_sanitize = ss.sanitize;
var replacementText = require("./replacementText_test");
var loop_test = require("./loop_test");
var removeEndTagsAfter = require("./removeEndTagsAfter_test");

module.exports = function () {
  describe("options parameter", function() {
    it('should take an options parameter', function() {
      var a = script_sanitize("<script></script>", null);
      assert.equal(a, "");
    });

    replacementText();

    loop_test();

    removeEndTagsAfter();
  });
};
