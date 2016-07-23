# script_sanitizer.js
A simple npm library to remove script tags but keep other html

[![npm](https://img.shields.io/npm/dt/script_sanitize.svg)](https://www.npmjs.com/package/script_sanitize)
[![Build Status](https://travis-ci.org/EverlessDrop41/script_sanitizer.js.svg?branch=master)](https://travis-ci.org/EverlessDrop41/script_sanitizer.js)
[![npm](https://img.shields.io/npm/v/script_sanitize.svg?maxAge=2592000)](https://www.npmjs.com/package/script_sanitize)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](https://www.npmjs.com/package/script_sanitize)

Installation
===
- NPM  `npm install script_sanitize`
- CDN   https://cdn.rawgit.com/EverlessDrop41/script_sanitizer.js/master/dist/script_sanitize.min.js

Usage
===
If on Node.js
```js
var script_santize = require('script_sanitize')
```

If on a website

```html
<script href="https://cdn.rawgit.com/EverlessDrop41/script_sanitizer.js/master/dist/script_sanitize.min.js"></script>
```

The method is defined as

`script_sanitize(html, options (optional))`

and can be used like so

```js
var sanitized = script_sanitize("<h1>Hello</h1><script>alert('hi')</script>");
//=> <h1>Hello</h1>
```

```js
var sanitizedWithReplacment = script_sanitize("<h1>Hello</h1><script>alert('hi')</script>", { replacementText: "no" });
//=> <h1>Hello</h1>no
```

The options parameter
--

| Option              | Description                                                                             | Default Value |
|---------------------|-----------------------------------------------------------------------------------------|---------------|
| replacementText     | The text to replace the script tag with                                                 | ""            |
| loop                | Whether to replace via looping or a single statement                                    | true          |
| replaceEndTagsAfter | In certain cases the ending script tag is still there, this options ensures it won't be | true          |


Disclaimer
===
The code uses regex, which has been sourced from [here](http://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression)
The regex is:
`/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi`
