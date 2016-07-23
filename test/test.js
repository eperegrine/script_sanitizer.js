var assert = require('chai').assert;
var script_sanitize = require('../script_sanitize');

describe('script_sanitize', function () {
  it('should remove empty script tags', function() {
    var s = script_sanitize("<script></script>");
    assert.equal(s, "");
  });
  it('should remove empty script tags with whitespace in', function() {
    var s = script_sanitize("<script> </script>");
    assert.equal(s, "");
  });

  describe("options parameter", function() {
    it('should take an options parameter', function() {
      var s = script_sanitize("<script></script>", null);
      assert.equal(s, "");
    });

    it('should have a replacementText in the options parameter', function() {
      var s = script_sanitize("<script></script>", { replacementText: "no" });
      assert.equal(s, "no");
    });
  })

});
