var assert = require('chai').assert;
var ss = require('../../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var script_sanitize = ss.sanitize;

module.exports = function() {
  describe("loop", function () {
    it('should be true by default', function () {
      var a = script_sanitize("<scr<script>alert('hi');</script>ipt></script>");
      assert.equal(a, "");
    });

    it('should be able to set to false', function () {
      var a = script_sanitize("<scr<script>alert('hi');</script>ipt>console.log('Hello');</script>", {loop: false});
      assert.equal(a, "<script>console.log('Hello');");
    });

    it('should work with the removeEndTagsAfter option', function () {
      var a = script_sanitize("<scr<script>alert('hi');</script>ipt>console.log('Hello');</script>", {
        loop: false,
        removeEndTagsAfter: false
      });
      assert.equal(a, "<script>console.log('Hello');</script>");
    });

    it('should work with the replacementText option', function () {
      var a = script_sanitize("<scr<script>alert('hi');</script>ipt>console.log('Hello');</script>", {
        loop: false,
        replacementText: "no"
      });
      assert.equal(a, "<scrnoipt>console.log('Hello');no");
    });

    it('should work with the both the removeEndTagsAfter and replacementText option', function () {
      var a = script_sanitize("<scr<script>alert('hi');</script>ipt>console.log('Hello');</script>", {
        loop: false,
        replacementText: "no",
        removeEndTagsAfter: false
      });
      assert.equal(a, "<scrnoipt>console.log('Hello');</script>");
    });
  });
};