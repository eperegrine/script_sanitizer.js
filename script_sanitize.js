//http://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression

function isDefined(obj) {
  return (typeof obj !== 'undefined') && obj != null
}

function defaultFor(variable,defaultValue){
  return (isDefined(variable))?(variable):(defaultValue);
}

function script_sanitize(html, options) {
  var replacementText = "";

  if (isDefined(options)) {
    replacementText = defaultFor(options.replacementText, "");
  }
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, replacementText);
}

if (typeof module !== undefined) {
  module.exports = script_sanitize;
}
