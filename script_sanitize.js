//With help from: http://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression
var utils = {
  isDefined: function (obj) {
    return (typeof obj !== 'undefined') && obj != null
  },
  defaultFor: function (variable,defaultValue){
    return (this.isDefined(variable))?(variable):(defaultValue);
  }
};

function script_sanitize(html, options) {
  var replacementText = "";
  var loop = true;
  var removeEndTagsAfter = true;

  if (utils.isDefined(options)) {
    replacementText = utils.defaultFor(options.replacementText, replacementText);
    loop = utils.defaultFor(options.loop, loop);
    removeEndTagsAfter = utils.defaultFor(options.removeEndTagsAfter, removeEndTagsAfter);
  }

  var strip_regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi;

  var scriptEndTagRegex = /<\/script\s*>/gi;

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

if (typeof module !== undefined) {
  module.exports = script_sanitize;
}
