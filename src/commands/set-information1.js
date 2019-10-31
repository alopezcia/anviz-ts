"use strict";
exports.__esModule = true;
var SetInformation1 = /** @class */ (function () {
    function SetInformation1() {
    }
    SetInformation1.prototype.isCorrectParm = function (parm) {
        return typeof parm.passwordLength === 'number' && typeof parm.password === 'number' &&
            typeof parm.sleepTime === 'number' && typeof parm.volume === 'number' &&
            typeof parm.language === 'number' && typeof parm.dateTimeFormat === 'number' &&
            typeof parm.attendanceState === 'number' && typeof parm.langSetting === 'number';
    };
    SetInformation1.prototype.getCmd = function () {
        return 0x31;
    };
    SetInformation1.prototype.parseRequest = function (parms) {
        if (this.isCorrectParm(parms)) {
            return new Uint8Array(); // TODO
        }
        else {
            throw new Error("parameters erroneous.  { passwordLength, password, sleepTime, volume, language, dateTimeFormat, attendanceState, langSetting }");
        }
    };
    SetInformation1.prototype.parseResponse = function (msg) {
        throw new Error("Method not implemented.");
    };
    return SetInformation1;
}());
exports.SetInformation1 = SetInformation1;
