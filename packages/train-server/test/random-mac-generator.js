"use strict";
exports.__esModule = true;
var data_forge_1 = require("data-forge");
var generateRandomMacAddresses = function (num) {
    var randomMacAddresses = [];
    for (var i = 0; i < num; ++i) {
        var macBytes = new Buffer(3);
        for (var j = 0; j < 3; ++j) {
            macBytes[j] = Math.round(0xFF * Math.random());
        }
        var macText = '';
        for (var j = 0; j < 3; ++j) {
            macText += macBytes[j].toString(16).padStart(2, '0');
            if (j < 2)
                macText += ':';
        }
        console.log(macText);
        randomMacAddresses.push(macText);
    }
    return randomMacAddresses;
};
var randomMacAddresses = generateRandomMacAddresses(50);
var generateRandomTime = function (startTime, offset, step) {
    return new Date(startTime.getTime() + offset * step * 1000);
};
var startDate = new Date();
var step = 12;
var testData = randomMacAddresses.map(function (mac, index) {
    var startStation = Math.round(10 * Math.random());
    var endStation = Math.max(startStation + 1, Math.round(10 * Math.random()));
    return {
        mac: mac,
        ts: generateRandomTime(startDate, index, step),
        startStation: startStation,
        endStation: endStation
    };
});
var testDataDF = new data_forge_1.DataFrame(testData);
console.log(testDataDF.toString());
