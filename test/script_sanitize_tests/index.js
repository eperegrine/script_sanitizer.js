var assert = require('chai').assert;
var ss = require('../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var script_sanitize = ss.sanitize;
var options_tests = require('./options_tests');

module.exports = function () {
  describe('script_sanitize', function () {
    it('should remove empty script tags', function() {
      var a = script_sanitize("<script></script>");
      assert.equal(a, "");
    });
    it('should remove empty script tags with whitespace in', function() {
      var a = script_sanitize("<script> </script>");
      assert.equal(a, "");
    });
    it('should remove script tags with code in', function() {
      var a = script_sanitize("<script>alert('hi')</script>");
      assert.equal(a, "");
      var b = script_sanitize("<script>alert('hi');</script>");
      assert.equal(b, "");
    });
    it('should remove script tags with trailing ends', function() {
      var a = script_sanitize("<script>alert('hi');</script   >");
      assert.equal(a, "");
    });
    it('should remove scripts tags and keep html', function() {
      var a = script_sanitize("<h1>Hello</h1><script> </script>");
      assert.equal(a, "<h1>Hello</h1>");
    });
    it('should remove double nested scripts tags', function() {
      var a = script_sanitize("<script><script>alert('hi');</script></script>");
      assert.equal(a, "");
    });
    it('should remove tag nested scripts tags', function() {
      var a = script_sanitize("<scr<script>alert('hi');</script>ipt></script>");
      assert.equal(a, "");
    });

    options_tests()
  });
};

