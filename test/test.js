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
  });
});
