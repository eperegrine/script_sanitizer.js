//With help from: http://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression
var utils = {
  isDefined: function (obj) {
    return (typeof obj !== 'undefined') && obj != null
  },
  defaultFor: function (variable,defaultValue){
    return (this.isDefined(variable))?(variable):(defaultValue);
  },
  generateRegexForTag: function (tag) {
    var a = "<" + tag + "\\b[^<]*(?:(?!<\\/" + tag + ">)<[^<]*)*<\\/" + tag + "\\s*>";
    return new RegExp(a, "gi");
  },
  generateRegexForEndTag: function (tag) {
    var a = "<\\/" + tag + "\\s*>";
    return new RegExp(a, "gi");
  }
};
var script_sanitize = {
  utils: utils,
  sanitize: function (html, options) {
    var replacementText = "";
    var loop = true;
    var removeEndTagsAfter = true;

    if (utils.isDefined(options)) {
      replacementText = utils.defaultFor(options.replacementText, replacementText);
      loop = utils.defaultFor(options.loop, loop);
      removeEndTagsAfter = utils.defaultFor(options.removeEndTagsAfter, removeEndTagsAfter);
    }

    var strip_regex = utils.generateRegexForTag("script");// /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi;

    var scriptEndTagRegex = utils.generateRegexForEndTag("script");// /<\/script\s*>/gi;

    if (loop) {
      while (strip_regex.test(html)) {
        html = html.replace(strip_regex, replacementText);
      }
    }
    else {
      html = html.replace(strip_regex, replacementText);
    }

    if (removeEndTagsAfter) {
      while (scriptEndTagRegex.test(html)) {
        html = html.replace(scriptEndTagRegex, replacementText);
      }
    }

    return html;
  }
}



if (typeof module !== undefined) {
  module.exports = script_sanitize;
}
