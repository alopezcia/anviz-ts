"use strict";
exports.__esModule = true;
var GetDateTime = /** @class */ (function () {
    function GetDateTime() {
    }
    GetDateTime.prototype.getCmd = function () {
        return 0x38;
    };
    GetDateTime.prototype.parseRequest = function (parms) {
        return new Uint8Array();
    };
    GetDateTime.prototype.parseResponse = function (msg) {
        var year = msg[0];
        var month = msg[1];
        var day = msg[2];
        var hours = msg[3];
        var minutes = msg[4];
        var seconds = msg[5];
        return { year: year, month: month, day: day, hours: hours, minutes: minutes, seconds: seconds };
    };
    return GetDateTime;
}());
exports.GetDateTime = GetDateTime;
