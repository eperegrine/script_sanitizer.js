var assert = require('chai').assert;
var ss = require('../../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var script_sanitize = ss.sanitize;
var replacementText = require("./replacementText_test");
var loop_test = require("./loop_test");

module.exports = function () {
  describe("removeEndTagsAfter", function () {
    it ('should be set to true by default', function () {
      var a = script_sanitize("<script><script>alert('hi');</script></script>");
      assert.equal(a, "");
    });
    it ('should be possible to set to false', function () {
      var a = script_sanitize("<script><script>alert('hi');</script></script>", {
        removeEndTagsAfter: false
      });
      assert.equal(a, "</script>");
    });
  });
};