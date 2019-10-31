"use strict";
exports.__esModule = true;
var GetTCPIPparms = /** @class */ (function () {
    function GetTCPIPparms() {
    }
    GetTCPIPparms.prototype.getCmd = function () {
        return 0x3A;
    };
    GetTCPIPparms.prototype.parseRequest = function (parms) {
        return new Uint8Array();
    };
    GetTCPIPparms.prototype.parseResponse = function (msg) {
        var ipAddress = msg[0].toString() + '.' + msg[1].toString() + '.' + msg[2].toString() + '.' + msg[3].toString();
        var subnetMask = msg[4].toString() + '.' + msg[5].toString() + '.' + msg[6].toString() + '.' + msg[7].toString();
        var macAddress = msg[8].toString(16) + '-' + msg[9].toString(16) + '-' + msg[10].toString(16) + '-' + msg[11].toString(16) + '-' + msg[12].toString(16) + '-' + msg[13].toString(16);
        var defaultGateway = msg[14].toString() + '.' + msg[15].toString() + '.' + msg[16].toString() + '.' + msg[17].toString();
        var serverIPAddress = msg[18].toString() + '.' + msg[19].toString() + '.' + msg[20].toString() + '.' + msg[21].toString();
        var farLimit = msg[22];
        var commPort = msg.readUInt16BE(23, 24);
        var tcpMide = msg[25];
        var dhcpLimit = msg[26];
        return { ipAddress: ipAddress, subnetMask: subnetMask, macAddress: macAddress, defaultGateway: defaultGateway, serverIPAddress: serverIPAddress, farLimit: farLimit, commPort: commPort, tcpMide: tcpMide, dhcpLimit: dhcpLimit };
    };
    return GetTCPIPparms;
}());
exports.GetTCPIPparms = GetTCPIPparms;
