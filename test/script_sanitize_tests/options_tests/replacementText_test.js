var assert = require('chai').assert;
var ss = require('../../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var script_sanitize = ss.sanitize;

module.exports = function () {
  describe("replacementText", function () {
    it('should replace text', function() {
      var a = script_sanitize("<script></script>", { replacementText: "no" });
      assert.equal(a, "no");
    });
    it('should replace text when tags have whitespace', function() {
      var a = script_sanitize("<script>  </script>", { replacementText: "no" });
      assert.equal(a, "no");
    });
    it('should replace text when tags have code', function() {
      var a = script_sanitize("<script>alert('hi')</script>", { replacementText: "no" });
      assert.equal(a, "no");
    });
    it('should replace text when tags and keep existing html', function() {
      var a = script_sanitize("<h1>Hello</h1><script>alert('hi')</script>", { replacementText: "no" });
      assert.equal(a, "<h1>Hello</h1>no");
    });
  });
};