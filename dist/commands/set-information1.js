"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SetInformation1 {
    isCorrectParm(parm) {
        return typeof parm.passwordLength === 'number' && parm.password === 'number' &&
            parm.sleepTime === 'number' && parm.volume === 'number' &&
            parm.language === 'number' && parm.dateTimeFormat === 'number' &&
            parm.attendanceState === 'number' && parm.langSetting === 'number';
    }
    getCmd() {
        return 0x31;
    }
    parseRequest(parms) {
        if (this.isCorrectParm(parms)) {
            return new Uint8Array();
        }
        else {
            throw new Error("parameters erroneous.  { passwordLength, password, sleepTime, volume, language, dateTimeFormat, attendanceState, langSetting }");
        }
    }
    parseResponse(msg) {
        throw new Error("Method not implemented.");
    }
}
exports.SetInformation1 = SetInformation1;
