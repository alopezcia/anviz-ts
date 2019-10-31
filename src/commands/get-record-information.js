"use strict";
exports.__esModule = true;
var GetRecordInformation = /** @class */ (function () {
    function GetRecordInformation() {
    }
    GetRecordInformation.prototype.getCmd = function () {
        return 0x3C;
    };
    GetRecordInformation.prototype.parseRequest = function (parms) {
        return new Uint8Array();
    };
    GetRecordInformation.prototype.parseResponse = function (msg) {
        var userAmount = msg.readUInt16BE(1, 3);
        var fpAmount = msg.readUInt16BE(4, 6);
        var passwordAmount = msg.readUInt16BE(7, 9);
        var cardAmount = msg.readUInt16BE(10, 12);
        var allRecordAmount = msg.readUInt16BE(13, 15);
        var newRecordAmount = msg.readUInt16BE(16, 18);
        return { userAmount: userAmount, fpAmount: fpAmount, passwordAmount: passwordAmount, cardAmount: cardAmount, allRecordAmount: allRecordAmount, newRecordAmount: newRecordAmount };
    };
    return GetRecordInformation;
}());
exports.GetRecordInformation = GetRecordInformation;
