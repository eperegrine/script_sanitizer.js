# script_sanitizer.js
A simple npm library to remove script tags but keep other html

[![npm](https://img.shields.io/npm/dt/script_sanitize.svg)](https://www.npmjs.com/package/script_sanitize)
[![Build Status](https://travis-ci.org/eperegrine/script_sanitizer.js.svg?branch=master)](https://travis-ci.org/eperegrine/script_sanitizer.js)
[![npm](https://img.shields.io/npm/v/script_sanitize.svg?maxAge=2592000)](https://www.npmjs.com/package/script_sanitize)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](https://www.npmjs.com/package/script_sanitize)

Installation
===
- NPM:  `npm install script_sanitize`
- CDN:   https://cdn.rawgit.com/eperegrine/script_sanitizer.js/master/dist/script_sanitize.min.js
- Repo:  dist/script_sanitize.js
- Repo Minified:  dist/script_sanitize.min.js

Documention
===========
https://doclets.io/eperegrine/script_sanitizer.js/master

Usage
===
If on Node.js
```js
const script_sanitize = require('../script_sanitize');
var sanitize = script_sanitize.sanitize;
```

If on a website

```html
<script href="https://cdn.rawgit.com/eperegrine/script_sanitizer.js/master/dist/script_sanitize.min.js"></script>
<script type="text/javascript">
  var sanitize = script_sanitize.sanitize;
</script>
```

The method is defined as

`sanitize(html, options (optional))`

and can be used like so

```js
var sanitized = sanitize("<h1>Hello</h1><script>alert('hi')</script>");
//=> <h1>Hello</h1>
```

```js
var sanitizedWithReplacment = sanitize("<h1>Hello</h1><script>alert('hi')</script>", { replacementText: "no" });
//=> <h1>Hello</h1>no
```

Attributes
--

The default attributes are stored in an array which can be refrenced like:

```js
var attrArray = script_sanitize.defaultAttributes;
```

and if you wanted to make an attribute exempt you could apply it like so

[thanks stack overflow](https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript)

```js
var newAttrArray = script_sanitize.defaultAttributes;
var exemptIndex = newAttrArray.indexOf("onclick");
newAttrArray.splice(exmptIndex, 1);
sanitize("[HTML STUFF]", { attributes: newAttrArray });
```

The options parameter
--

| Option              | Description                                                                             | Default Value     |
|---------------------|-----------------------------------------------------------------------------------------|-------------------|
| replacementText     | The text to replace the script tag with                                                 | ""                |
| loop                | Whether to replace via looping or a single statement                                    | true              |
| replaceEndTagsAfter | In certain cases the ending script tag is still there, this options ensures it won't be | true              |
| tags                | The tags that should be replaced                                                        | ["script"]        |
| attributes          | The attributes that should be replaced                                                  | defaultAttributes |

Utils
--
| Util                      | Description                                     |
|---------------------------|-------------------------------------------------|
| isDefined                 | Checks if a variable is defined                 |
| defaultFor                | Sets a default value if a variable is defined   |
| generateRegexForTag       | Generates a regex object for a tag              |
| generateRegexForEndTag    | Generates a regex object to check an end tag    |
| generateRegexForAttribute | Generates a regex object to check an attribute  |

License
===
[MIT](https://opensource.org/licenses/MIT)

Disclaimer
===
The code uses regex, which has been sourced from [here](http://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression)
The regex is:
`/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi`

Although this library will likely be used for security purposes I, the developer, am not responsible if this pacakge doesn't meet your security requirements so use with caution
