"use strict";
exports.__esModule = true;
var DownloadAttendanceRecords = /** @class */ (function () {
    function DownloadAttendanceRecords() {
    }
    DownloadAttendanceRecords.prototype.isCorrectParm = function (parm) {
        return typeof parm.parameter === 'number' && typeof parm.recordAmount === 'number';
    };
    DownloadAttendanceRecords.prototype.getCmd = function () {
        return 0x40;
    };
    DownloadAttendanceRecords.prototype.parseRequest = function (parms) {
        if (this.isCorrectParm(parms)) {
            return new Uint8Array([parms.parameter, parms.recordAmount]);
        }
        else {
            throw new Error("parameters erroneous.  { parameter, recordAmount }");
        }
    };
    DownloadAttendanceRecords.prototype.parseResponse = function (msg) {
        if (msg.length < 14) {
            return {};
        }
        // console.log(msg.length);
        var numRecs = msg[0];
        // console.log(numRecs);
        var records = [];
        for (var i = 0; i < numRecs; i++) {
            var record = msg.slice(1 + (i * 14), 14 + (i * 14));
            var userCode = record.readUInt32BE(1, 4);
            var dateU = record.readUInt32BE(5, 8);
            var date = new Date((new Date("2000-01-02 01:00:00").getTime()) + dateU * 1000);
            var backup = record[9];
            var recordType = record[10];
            var workTypes = record.readUInt16BE(11, 13);
            records.push({ userCode: userCode, date: date, backup: backup, recordType: recordType, workTypes: workTypes });
        }
        return records;
    };
    return DownloadAttendanceRecords;
}());
exports.DownloadAttendanceRecords = DownloadAttendanceRecords;
