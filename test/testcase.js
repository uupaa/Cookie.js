var ModuleTestCookie = (function(global) {

global["BENCHMARK"] = false;

var test = new Test("Cookie", {
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     false, // enable worker test.
        node:       false, // enable node test.
        nw:         true,  // enable nw.js test.
        el:         true,  // enable electron (render process) test.
        button:     true,  // show button.
        both:       true,  // test the primary and secondary modules.
        ignoreError:false, // ignore error.
        callback:   function() {
        },
        errorback:  function(error) {
            console.error(error.message);
        }
    }).add([
        // Generic test
        testCookie_parse,
        testCookie_build,
    ]);

if (IN_BROWSER || IN_NW || IN_EL) {
    test.add([
        // Browser, NW.js and Electron test
    ]);
} else if (IN_WORKER) {
    test.add([
        // WebWorkers test
    ]);
} else if (IN_NODE) {
    test.add([
        // Node.js test
    ]);
}

// --- test cases ------------------------------------------
function testCookie_parse(test, pass, miss) {

    var cookie = "f=718A79A2-4CFA-11E5-A83C-933474047A5A; f=E7231F44-83C2-11E5-BCE6-95998EA95E17; _gat=1; id=YyTnZ6oqGXYDUkEgC6NTe9CWp4jiESGjm0dCIkQKYpahZB6Wy3R2onl_pFeCkaRI; lang=ja";
    var hash = Cookie.parse(cookie);

    var result = {
        0: hash.lang  === "ja",
        1: hash.f[0]  === "718A79A2-4CFA-11E5-A83C-933474047A5A",
        2: hash.f[1]  === "E7231F44-83C2-11E5-BCE6-95998EA95E17",
        3: hash._gat  === "1",
        4: hash.id    === "YyTnZ6oqGXYDUkEgC6NTe9CWp4jiESGjm0dCIkQKYpahZB6Wy3R2onl_pFeCkaRI",
    };

    if ( /false/.test(JSON.stringify(result)) ) {
        test.done(miss());
    } else {
        test.done(pass());
    }
}

function testCookie_build(test, pass, miss) {
    var f0 = "718A79A2-4CFA-11E5-A83C-933474047A5A";
    var f1 = "E7231F44-83C2-11E5-BCE6-95998EA95E17";
    var options = { domain: "example.com", path: "/", expire: 123, secure: true };

    var result = {
        0: Cookie.build({ lang: "ja" }) === "lang=ja",
        1: Cookie.build({ f: [f0, f1] }) === "f=" + f0 + "; f=" + f1,
        2: Cookie.build({ lang: "ja" }, options) === "lang=ja; domain=example.com; path=/; max-age=123; secure",
    };

    if ( /false/.test(JSON.stringify(result)) ) {
        test.done(miss());
    } else {
        test.done(pass());
    }
}

return test.run();

})(GLOBAL);

