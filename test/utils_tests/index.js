var assert = require('chai').assert;
var ss = require('../../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var utils = ss.utils;
var generateRegexForTag = require("./generateRegexForTag_test");
var generateRegexForEndTag = require("./generateRegexForEndTag_test");
var generateRegexForAttribute = require("./generateRegexForAttribute_test");

module.exports = function () {
  describe('utils', function () {
    generateRegexForTag();

    generateRegexForEndTag();

    generateRegexForAttribute();
  });
};