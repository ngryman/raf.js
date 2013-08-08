/*
 * raf.js
 * https://github.com/ngryman/raf.js
 *
 * original requestAnimationFrame polyfill by Erik Möller
 * inspired from paul_irish gist and post
 *
 * Copyright (c) 2013 ngryman
 * Licensed under the MIT license.
 */

 (function (root, factory) {
    if (typeof exports === 'object') {
        var exports = {
            requestAnimationFrame: this.requestAnimationFrame,
            cancelAnimationFrame: this.cancelAnimationFrame
        };
        factory(exports);
        module.exports = exports;
    } else if (typeof define === 'function' && define.amd) {
        define(['raf'], factory);
    } else {
        factory(this);
  }
}(this, function (exports) {

    var lastTime = 0,
        vendors = ['webkit', 'moz'],
        requestAnimationFrame = exports.requestAnimationFrame,
        cancelAnimationFrame = exports.cancelRequestAnimationFrame,
        i = vendors.length;

    // try to un-prefix existing raf
    while (--i >= 0 && !requestAnimationFrame) {
        requestAnimationFrame = exports[vendors[i] + 'RequestAnimationFrame'];
        cancelAnimationFrame = exports[vendors[i] + 'CancelRequestAnimationFrame'];
    }

    // polyfill with setTimeout fallback
    // heavily inspired from @darius gist mod: https://gist.github.com/paulirish/1579671#comment-837945
    if (!requestAnimationFrame || !cancelAnimationFrame) {
        requestAnimationFrame = function(callback) {
            var now = +Date.now(),
                nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() {
                callback(lastTime = nextTime);
            }, nextTime - now);
        };

        cancelAnimationFrame = clearTimeout;
    }

    if (!cancelAnimationFrame){
        exports.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    exports.requestAnimationFrame = requestAnimationFrame;
    exports.cancelRequestAnimationFrame = cancelAnimationFrame;
}));