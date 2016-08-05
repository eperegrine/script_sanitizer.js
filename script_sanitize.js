//With help from: http://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression
var utils = {
  isDefined: function (obj) {
    return (typeof obj !== 'undefined') && obj != null
  },
  defaultFor: function (variable, defaultValue){
    return (this.isDefined(variable))?(variable):(defaultValue);
  },
  generateRegexForTag: function (tag) {
    var a = "<" + tag + "\\b[^<]*(?:(?!<\\/" + tag + ">)<[^<]*)*<\\/" + tag + "\\s*>";
    return new RegExp(a, "gi");
  },
  generateRegexForEndTag: function (tag) {
    var a = "<\\/" + tag + "\\s*>";
    return new RegExp(a, "gi");
  },
  generateRegexForAttribute: function (attribute) {
    var a = attribute + "=\"[^\"]*\""
    return new RegExp(a, "gi")
  }
};

var script_sanitize = {
  utils: utils,
  sanitize: function (html, options) {
    var replacementText = "";
    var loop = true;
    var removeEndTagsAfter = true;
    var tags = ["script"];
    var attributes = ["onmouseover"];

    if (utils.isDefined(options)) {
      replacementText = utils.defaultFor(options.replacementText, replacementText);
      loop = utils.defaultFor(options.loop, loop);
      removeEndTagsAfter = utils.defaultFor(options.removeEndTagsAfter, removeEndTagsAfter);
      tags = utils.defaultFor(options.tags, tags);
      attributes = utils.defaultFor(options.attributes, attributes);
    }

    for (var i in tags) {
      var tag = tags[i];
      var strip_regex = utils.generateRegexForTag(tag);// /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi;

      var endTagRegex = utils.generateRegexForEndTag(tag);// /<\/script\s*>/gi;

      if (loop) {
        while (strip_regex.test(html)) {
          html = html.replace(strip_regex, replacementText);
        }
      }
      else {
        html = html.replace(strip_regex, replacementText);
      }

      if (removeEndTagsAfter) {
        while (endTagRegex.test(html)) {
          html = html.replace(endTagRegex, replacementText);
        }
      }
    }

    return html;
  }
};

if (typeof module !== undefined) {
  module.exports = script_sanitize;
}
