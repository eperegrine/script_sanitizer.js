//With help from: http://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression

function isDefined(obj) {
  return (typeof obj !== 'undefined') && obj != null
}

function defaultFor(variable,defaultValue){
  return (isDefined(variable))?(variable):(defaultValue);
}

function script_sanitize(html, options) {
  var replacementText = "";
  var loop = true;
  var removeEndTagsAfter = true;

  if (isDefined(options)) {
    replacementText = defaultFor(options.replacementText, replacementText);
    loop = defaultFor(options.loop, loop);
    removeEndTagsAfter = defaultFor(options.removeEndTagsAfter, removeEndTagsAfter);
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
