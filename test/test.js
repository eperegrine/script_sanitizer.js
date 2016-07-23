var assert = require('chai').assert;
var script_sanitize = require('../script_sanitize');

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

  describe("options parameter", function() {
    it('should take an options parameter', function() {
      var a = script_sanitize("<script></script>", null);
      assert.equal(a, "");
    });

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
  });
});
