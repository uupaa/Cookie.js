# Cookie.js [![Build Status](https://travis-ci.org/uupaa/Cookie.js.svg)](https://travis-ci.org/uupaa/Cookie.js)

[![npm](https://nodei.co/npm/uupaa.cookie.js.svg?downloads=true&stars=true)](https://nodei.co/npm/uupaa.cookie.js/)

Cookie parse and build.

This module made of [WebModule](https://github.com/uupaa/WebModule).

## Documentation
- [Spec](https://github.com/uupaa/Cookie.js/wiki/)
- [API Spec](https://github.com/uupaa/Cookie.js/wiki/Cookie)

## Browser, NW.js and Electron

```js
<script src="<module-dir>/lib/WebModule.js"></script>
<script src="<module-dir>/lib/Cookie.js"></script>
<script>
if (Cookie.ready) {
    var obj = Cookie.parse("lang=ja;id=123");
    obj.lang // -> "ja"
    obj.id   // -> 123

    document.cookie = Cookie.build({ lang: ja }, { secure: true });
}
</script>
```

## WebWorkers

```js
importScripts("<module-dir>/lib/WebModule.js");
importScripts("<module-dir>/lib/Cookie.js");

```

## Node.js

```js
require("<module-dir>/lib/WebModule.js");
require("<module-dir>/lib/Cookie.js");

```

