var assert = require('chai').assert;
var ss = require('../script_sanitize');
var describe = require('mocha/lib/mocha.js').describe;
var it = require('mocha/lib/mocha.js').it;
var script_sanitize = ss.sanitize;
var utils = ss.utils;
var script_sanitize_tests = require("./script_sanitize_tests");
var utils_tests = require("./utils_tests");

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

script_sanitize_tests();

utils_tests();