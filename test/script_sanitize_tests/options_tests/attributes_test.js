var assert = require('chai').assert;
var ss = require('../../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var script_sanitize = ss.sanitize;

module.exports = function () {
  describe("tags", function () {
    it('should replace the attribute specified', function() {
      var a = script_sanitize("<h1 onload=''></h1>", { attributes: ["onload"], tags: [] });
      assert.equal(a, "<h1 ></h1>");
    });

    it('should support multiple attributes', function() {
      var a = script_sanitize("<h1 onload='' onmouseover=''></h1>", { attributes: ["onload", "onmouseover"], tags: [] });
      assert.equal(a, "<h1  ></h1>");
    });
  });
};
