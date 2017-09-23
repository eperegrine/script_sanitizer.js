var assert = require('chai').assert;
var ss = require('../../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var script_sanitize = ss.sanitize;

module.exports = function () {
  describe("attributes", function () {
    it('should replace the attribute specified', function() {
      var a = script_sanitize("<h1 onload=''></h1>", { attributes: ["onload"], tags: [] });
      assert.isOk(!a.includes("onload"));
    });

    it('should support multiple attributes', function() {
      var a = script_sanitize("<h1 onload='' onmouseover=''></h1>", { attributes: ["onload", "onmouseover"], tags: [] });
      assert.isOk(!a.includes("onload"));
      assert.isOk(!a.includes("onmouseover"));
    });

    it('should remove nested attributes', function () {
      var a = script_sanitize("<h1 onload='onload='''></h1>", { attributes: ["onload", "onmouseover"], tags: [] });
      assert.isOk(!a.includes("onload"));
    });
  });
};
