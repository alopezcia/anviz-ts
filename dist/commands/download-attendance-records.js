"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DownloadAttendanceRecords {
    isCorrectParm(parm) {
        return typeof parm.parameter === 'number' && parm.recordAmount === 'number';
    }
    getCmd() {
        return 0x40;
    }
    parseRequest(parms) {
        if (this.isCorrectParm(parms)) {
            return new Uint8Array();
        }
        else {
            throw new Error("parameters erroneous.  { parameter, recordAmount }");
        }
    }
    parseResponse(msg) {
        throw new Error("Method not implemented.");
    }
}
exports.DownloadAttendanceRecords = DownloadAttendanceRecords;
