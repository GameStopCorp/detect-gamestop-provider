(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.detectGamestopProvider = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var detectGamestopProvider = function (opts) {
    if (opts === void 0) { opts = { timeout: 3000 }; }
    return new Promise(function (resolve) {
        var _a;
        if ((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isGamestop) {
            resolve(window.ethereum);
            return;
        }
        if (window.gamestop) {
            resolve(window.gamestop);
            return;
        }
        var handledInitialization = false;
        var handleInitialization = function () {
            var _a;
            if (handledInitialization)
                return;
            handledInitialization = true;
            window.removeEventListener("gamestop#initialized", handleInitialization);
            if ((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isGamestop) {
                resolve(window.ethereum);
                return;
            }
            if (window.gamestop) {
                resolve(window.gamestop);
                return;
            }
            console.error("Gamestop Browser Wallet not detected");
            resolve(null);
        };
        window.addEventListener("gamestop#initialized", handleInitialization);
        setTimeout(handleInitialization, opts.timeout);
    });
};
exports["default"] = detectGamestopProvider;

},{}]},{},[1])(1)
});
