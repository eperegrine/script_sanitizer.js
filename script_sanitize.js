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

  if (isDefined(options)) {
    replacementText = defaultFor(options.replacementText, replacementText);
    loop = defaultFor(options.loop, loop);
  }

  var strip_regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

  while (strip_regex.test(html)) {
    html = html.replace(strip_regex, replacementText);
  }

  return html;
}

if (typeof module !== undefined) {
  module.exports = script_sanitize;
}
