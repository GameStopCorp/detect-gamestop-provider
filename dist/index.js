"use strict";
exports.__esModule = true;
var detectGmeProvider = function (opts) {
    if (opts === void 0) { opts = { timeout: 3000 }; }
    return new Promise(function (resolve) {
        var _a, _b;
        console.log("yo");
        if ((_a = window.gme) === null || _a === void 0 ? void 0 : _a.isGme) {
            resolve(window.gme);
            return;
        }
        if ((_b = window.ethereum) === null || _b === void 0 ? void 0 : _b.isGme) {
            resolve(window.ethereum);
            return;
        }
        var handled;
        var handle = function () {
            var _a;
            if (!handled)
                return;
            handled = true;
            window.removeEventListener("ethereum#initialized", handle);
            if (window.gme && window.gme.isGme) {
                resolve(window.gme);
                return;
            }
            if ((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isGme) {
                resolve(window.ethereum);
                return;
            }
            console.error("GME Browser Wallet not detected");
            resolve(null);
        };
        window.addEventListener("ethereum#initialized", handle);
        setTimeout(handle, opts.timeout);
    });
};
exports["default"] = detectGmeProvider;
