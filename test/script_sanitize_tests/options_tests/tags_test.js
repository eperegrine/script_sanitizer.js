var assert = require('chai').assert;
var ss = require('../../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var script_sanitize = ss.sanitize;

module.exports = function () {
  describe("tags", function () {
    it('should default to script', function() {
      var a = script_sanitize("<script></script>");
      assert.equal(a, "");
    });
    it('should replace the tag specified', function() {
      var a = script_sanitize("<h1></h1>", { tags: ["h1"] });
      assert.equal(a, "");
    });
    it('should replace multiple tags', function() {
      var a = script_sanitize("<script></script><h1></h1>", { tags: ["h1", "script"] });
      assert.equal(a, "");
    });
    it('should ignore script if not specified', function() {
      var a = script_sanitize("<script></script><h1></h1>", { tags: ["h1"] });
      assert.equal(a, "<script></script>");
    });
  });
};