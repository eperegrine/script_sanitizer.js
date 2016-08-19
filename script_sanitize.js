//With help from: http://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression


/**
 * The object that exposes the sanitizer
 * @namespace
 * @property {function} sanitize - Sanitizes html to remove unsafe content
 * @property {namespace} utils - An object containing utility functions
 */
var script_sanitize = {
    /**
     * An object containing utility functions
     * @namespace
     */
  utils: {
    /**
     * Returns a boolean saying whether obj is defined
     * @param {object} obj - the object to check if it's null
     * @returns boolean
     */
    isDefined: function (obj) {
      return (typeof obj !== 'undefined') && obj != null
    },
    /**
     * Defaults to defaultValue if variable is null
     * @param {object} variable - The object to check
     * @param {object} defaultValue - The value to return if the object is null
     * @returns object
     */
    defaultFor: function (variable, defaultValue){
      return (this.isDefined(variable))?(variable):(defaultValue);
    },
    /**
     * Generates a regex object to select a tag
     * @param {string} tag - The name of the tag to select
     * @returns RegExp
     */
    generateRegexForTag: function (tag) {
      var a = "<" + tag + "\\b[^<]*(?:(?!<\\/" + tag + ">)<[^<]*)*<\\/" + tag + "\\s*>";
      return new RegExp(a, "gi");
    },

    /**
     * Generates a regex object to select an end tag
     * @param {string} tag - The name of the tag to select
     * @returns RegExp
     */
    generateRegexForEndTag: function (tag) {
      var a = "<\\/" + tag + "\\s*>";
      return new RegExp(a, "gi");
    },

    /**
     * Generates a regex object to select an attribute
     * @param {string} attribute - The name of the tag to select
     * @returns RegExp
     */
    generateRegexForAttribute: function (attribute) {
      var a = attribute + "=(\"|\')[^\"\']*(\"|\')";
      return new RegExp(a, "gi")
    }
  },

  /**
   * Sanitizes html to remove unsafe content
   * @param {string} html - The html to be sanitized
   *
   * @param {object} options - An object detailing the options for sanitizing
   * @param {string} [options.replacementText = ""] - The string to replace tags with
   * @param {boolean} [options.loop = true] - A boolean to say whether we loop
   * @param {string[]} [options.tags = ["script"]] - The tags that should be removed
   * @param {string[]} [options.attributes = ["onmouseover"]] - The attributes that should be removed
   * @returns string
   */
  sanitize: function (html, options) {
    var replacementText = "";
    var loop = true;
    var removeEndTagsAfter = true;
    var tags = ["script"];
    var attributes = ["onmouseover"];
    var utils = script_sanitize.utils;
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

    for (var j in attributes) {
      var attribute = attributes[j];
      var aRegex = utils.generateRegexForAttribute(attribute);

      while (aRegex.test(html)) {
        html = html.replace(aRegex, "")
      }
    }

    return html;
  }
};

if (typeof module !== undefined) {
  module.exports = script_sanitize;
}
