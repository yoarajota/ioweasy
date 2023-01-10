"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUnique(arr) {
    return [...new Set(arr)];
}
exports.default = getUnique;
