(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("Cookie", function moduleClosure(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
// --- class / interfaces ----------------------------------
var Cookie = {
    "ready":        Cookie_ready, // Cookie.ready():Boolean
    "parse":        Cookie_parse, // Cookie.parse(cookie:CookieString):Object
    "build":        Cookie_build, // Cookie.build(cookie:Object):CookieString
    "repository":   "https://github.com/uupaa/Cookie.js",
};

// --- implements ------------------------------------------
function Cookie_ready() {
    if (global["navigator"] &&
        global["document"]) {
        return !!navigator["cookieEnabled"];
    }
    return false;
}

function Cookie_parse(cookie) { // @arg CookieString = document.cookie
                                // @ret Object - { key: value, ... }
//{@dev
    $valid($type(cookie, "CookieString|omit"), Cookie_parse, "cookie");
//}@dev

    var result = {};
    var cookieString = cookie || global["document"]["cookie"] || "";

    cookieString.split(/;\s*/).forEach(function(token) {
        var kv    = token.split("="); // ["key", "value"]
        var key   = decodeURIComponent(kv[0]);
        var value = decodeURIComponent(kv[1]);

        if (key in result) {
            if (!Array.isArray(result[key])) {
                result[key] = [ result[key], value ];
            } else {
                result[key].push(value);
            }
        } else {
            result[key] = value;
        }
    });
    return result;
}

function Cookie_build(cookie,    // @arg Object - { key: value, ... }
                      options) { // @arg Object = null - { domain:String, path:String, expire:UINT32, secure:Boolean }
                                 // @ret CookieString - "key=value;..."
//{@dev
    $valid($type(cookie,  "Object"),      Cookie_build, "cookie");
    $valid($type(options, "Object|omit"), Cookie_build, "options");
    $valid($keys(options, "domain|path|expire|secure"), Cookie_build, "options");
    if (options) {
        $valid($type(options.domain, "String|omit"),  Cookie_build, "options.domain");
        $valid($type(options.path,   "String|omit"),  Cookie_build, "options.path");
        $valid($type(options.expire, "UINT32|omit"),  Cookie_build, "options.expire");
        $valid($type(options.secure, "Boolean|omit"), Cookie_build, "options.secure");
    }
//}@dev

    options = options || {};

    var tokens = [];

    for (var key in cookie) {
        var value = cookie[key];
        if (Array.isArray(value)) {
            for (var i = 0, iz = value.length; i < iz; ++i) {
                tokens.push( encodeURIComponent(key) + "=" + encodeURIComponent(value[i]) ); // "key=value"
            }
        } else {
            tokens.push( encodeURIComponent(key) + "=" + encodeURIComponent(value) ); // "key=value"
        }
    }
    if (options["domain"]) { tokens.push("domain="  + options["domain"]); }
    if (options["path"])   { tokens.push("path="    + options["path"]);   }
    if (options["expire"]) { tokens.push("max-age=" + options["expire"]); }
    if (options["secure"]) { tokens.push("secure"); }

    return tokens.join("; ");
}

return Cookie; // return entity

});

