"use strict";
exports.__esModule = true;
var GetInformation1 = /** @class */ (function () {
    function GetInformation1() {
    }
    GetInformation1.prototype.getCmd = function () {
        return 0x30;
    };
    GetInformation1.prototype.parseRequest = function (parms) {
        return new Uint8Array();
    };
    GetInformation1.prototype.parseResponse = function (msg) {
        var firmwareVersion = msg.slice(0, 7).toString();
        var passlength = msg[8] >> 4;
        var communicationPass = msg.slice(9, 10).toString();
        var sleepTime = msg[11];
        var volume = msg[12];
        var language = msg[13];
        var dateTimeFormat = msg[14];
        var attendanceState = msg[15];
        var languageSettingFlag = msg[16];
        var commandVersion = msg[17];
        return { firmwareVersion: firmwareVersion, passlength: passlength, communicationPass: communicationPass, sleepTime: sleepTime, volume: volume, language: language, dateTimeFormat: dateTimeFormat, attendanceState: attendanceState, languageSettingFlag: languageSettingFlag, commandVersion: commandVersion };
    };
    return GetInformation1;
}());
exports.GetInformation1 = GetInformation1;
