"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var data_forge_1 = require("data-forge");
var generateRandomTime = function (startTime, offset, step) {
    return new Date(startTime.getTime() + offset * step * 1000);
};
var startDate = new Date();
var step = 30;
var entries = [];
for (var i = 0; i < 10; ++i) {
    var ts = generateRandomTime(startDate, i, step);
    entries.push({ 'mac': 'C8:94:BB:E9:EE:52', name: 'Telefon Jos', ts: ts });
}
var testData = entries.map(function (mac, index) {
    var startStation = Math.round(10 * Math.random());
    var endStation = Math.max(startStation + 1, Math.round(10 * Math.random()));
    return {
        mac: mac,
        startStation: startStation,
        endStation: endStation
    };
});
var testDataDF = new data_forge_1.DataFrame(entries);
console.log(testDataDF.toString());
console.log(JSON.stringify(entries.map(function (entry) { return (__assign({}, entry, { ts: entry.ts.toISOString() })); }), null, 2));
