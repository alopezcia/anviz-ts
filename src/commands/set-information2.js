"use strict";
exports.__esModule = true;
var SetInformation2 = /** @class */ (function () {
    function SetInformation2() {
    }
    SetInformation2.prototype.isCorrectParm = function (parm) {
        return typeof parm.fingetprintPrecision === 'number' && typeof parm.fixedWiegand === 'number' &&
            typeof parm.wiegandOption === 'number' && typeof parm.workCode === 'number' &&
            typeof parm.realTimeMode === 'number' && typeof parm.fpAutoUpdate === 'number' &&
            typeof parm.relayMode === 'number' && typeof parm.lockDelay === 'number' &&
            typeof parm.memoryFullAlarm === 'number' && typeof parm.reapeatAttendanceDelay === 'number' &&
            typeof parm.doorSensorDeay === 'number' && typeof parm.scheduledBellDelay === 'number';
    };
    SetInformation2.prototype.getCmd = function () {
        return 0x33;
    };
    SetInformation2.prototype.parseRequest = function (parms) {
        if (this.isCorrectParm(parms)) {
            return new Uint8Array(); // TODO
        }
        else {
            throw new Error("parameters erroneous.  { fingetprintPrecision, fixedWiegand, wiegandOption, workCode, realTimeMode: number, fpAutoUpdate, relayMode, lockDelay, memoryFullAlarm, reapeatAttendanceDelay, doorSensorDeay, scheduledBellDelay }");
        }
    };
    SetInformation2.prototype.parseResponse = function (msg) {
        throw new Error("Method not implemented.");
    };
    return SetInformation2;
}());
exports.SetInformation2 = SetInformation2;
