"use strict";
exports.__esModule = true;
var pack_1 = require("../pack");
var ClearRecords = /** @class */ (function () {
    function ClearRecords() {
    }
    ClearRecords.prototype.isCorrectParm = function (parm) {
        return typeof parm.clearAll === 'boolean' && typeof parm.amount === 'number';
    };
    ClearRecords.prototype.getCmd = function () {
        return 0x4E;
    };
    ClearRecords.prototype.parseRequest = function (parms) {
        if (this.isCorrectParm(parms)) {
            var record = new Uint8Array(4);
            if (parms.clearAll) {
                record[0] = 0;
                record[1] = 0;
                record[2] = 0;
                record[3] = 0;
            }
            else {
                if (parms.amount > 0) {
                    record[0] = 2;
                    var a = pack_1.Pack.packInteger(parms.amount);
                    record[1] = a[1];
                    record[2] = a[2];
                    record[3] = a[3];
                }
                else {
                    record[0] = 1;
                    record[1] = 0;
                    record[2] = 0;
                    record[3] = 0;
                }
            }
            return record;
        }
        else {
            throw new Error("parameters erroneous.  { clearAll, amount }");
        }
    };
    ClearRecords.prototype.parseResponse = function (msg) {
        return { amountDelete: msg.readUInt16BE(0, 2) };
    };
    return ClearRecords;
}());
exports.ClearRecords = ClearRecords;
