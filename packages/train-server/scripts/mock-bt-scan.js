"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var rxjs_1 = require("rxjs");
var payload1 = {
    "devices": [
        {
            "mac": "C8:94:BB:E9:EE:52",
            "name": "Telefon Jos"
        }
    ]
};
var payload2 = {
    "devices": [
        {
            "mac": "D8:94:BB:E9:EE:52",
            "name": "Telefon Bos"
        }
    ]
};
rxjs_1.timer(0, 3000)
    .subscribe(function (counter) {
    counter = counter % 10;
    axios_1["default"].post('http://localhost:3000/mock/bluetooth-scan', (counter < 5) ? payload1 : payload2);
});
