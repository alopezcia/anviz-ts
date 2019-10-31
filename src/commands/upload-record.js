"use strict";
exports.__esModule = true;
var pack_1 = require("../pack");
var UploadRecord = /** @class */ (function () {
    function UploadRecord() {
    }
    UploadRecord.prototype.isCorrectParm = function (parm) {
        return typeof parm.userCode === 'number' && typeof parm.dateTime === 'object';
    };
    UploadRecord.prototype.getCmd = function () {
        return 0x41;
    };
    UploadRecord.prototype.parseRequest = function (parms) {
        if (this.isCorrectParm(parms)) {
            var record = new Uint8Array(14);
            record[0] = 0;
            var userCode = pack_1.Pack.packInteger(parms.userCode);
            record[1] = userCode[0];
            record[2] = userCode[1];
            record[3] = userCode[2];
            record[4] = userCode[3];
            // Attention with UTC date
            var diff = parms.dateTime.getHours() - parms.dateTime.getUTCHours();
            var recordEpoch = void 0;
            if (diff === 1) {
                recordEpoch = new Date("2000-01-02 00:00:00");
            }
            else {
                recordEpoch = new Date("2000-01-01 23:00:00");
            }
            var dd = Math.trunc((parms.dateTime.getTime() - (recordEpoch.getTime())) / 1000);
            var dateTime = pack_1.Pack.packInteger(dd);
            record[5] = dateTime[0];
            record[6] = dateTime[1];
            record[7] = dateTime[2];
            record[8] = dateTime[3];
            record[9] = 0x08;
            record[10] = 0x80;
            record[11] = 0;
            record[12] = 0;
            return record;
        }
        else {
            throw new Error("parameters erroneous.  { userCode, dateTime }");
        }
    };
    UploadRecord.prototype.parseResponse = function (msg) {
        return {};
    };
    return UploadRecord;
}());
exports.UploadRecord = UploadRecord;
