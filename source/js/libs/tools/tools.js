"use strict";

/**
 * Check if a array contains a value.
 */
Array.prototype.contains = function (obj) {
    var i = this.length;

    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }

    return false;
};
