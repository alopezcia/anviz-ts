"use strict";
exports.__esModule = true;
var GetInformation2 = /** @class */ (function () {
    function GetInformation2() {
    }
    GetInformation2.prototype.getCmd = function () {
        return 0x32;
    };
    GetInformation2.prototype.parseRequest = function (parms) {
        return new Uint8Array();
    };
    GetInformation2.prototype.parseResponse = function (msg) {
        var fingetprintPrecision = msg[0];
        var fixedWiegand = msg[1];
        var wiegandOption = msg[2];
        var workCode = msg[3];
        var realTimeMode = msg[4];
        var fpAutoUpdate = msg[5];
        var relayMode = msg[6];
        var lockDelay = msg[7];
        var memoryFullAlarm = msg.slice(8, 10);
        var reapeatAttendanceDelay = msg[11];
        var doorSensorDeay = msg[12];
        var scheduledBellDelay = msg[13];
        var reserve = msg[14];
        return { fingetprintPrecision: fingetprintPrecision, fixedWiegand: fixedWiegand, wiegandOption: wiegandOption, workCode: workCode,
            realTimeMode: realTimeMode, fpAutoUpdate: fpAutoUpdate, relayMode: relayMode, lockDelay: lockDelay, memoryFullAlarm: memoryFullAlarm,
            reapeatAttendanceDelay: reapeatAttendanceDelay, doorSensorDeay: doorSensorDeay, scheduledBellDelay: scheduledBellDelay, reserve: reserve };
    };
    return GetInformation2;
}());
exports.GetInformation2 = GetInformation2;
