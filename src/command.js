"use strict";
exports.__esModule = true;
var get_information1_1 = require("./commands/get-information1");
var set_information1_1 = require("./commands/set-information1");
var get_information2_1 = require("./commands/get-information2");
var set_information2_1 = require("./commands/set-information2");
var get_date_time_1 = require("./commands/get-date-time");
var get_tcp_ip_parms_1 = require("./commands/get-tcp-ip-parms");
var get_record_information_1 = require("./commands/get-record-information");
var download_attendance_records_1 = require("./commands/download-attendance-records");
var upload_record_1 = require("./commands/upload-record");
var clear_records_1 = require("./commands/clear-records");
var Command = /** @class */ (function () {
    function Command() {
    }
    Command.inventory = function () {
        var Maps = new Map();
        Maps.set('getInformation1', new get_information1_1.GetInformation1());
        Maps.set('setInformation1', new set_information1_1.SetInformation1());
        Maps.set('getInformation2', new get_information2_1.GetInformation2());
        Maps.set('setInformation2', new set_information2_1.SetInformation2());
        Maps.set('getDateTime', new get_date_time_1.GetDateTime());
        Maps.set('getTcpipParms', new get_tcp_ip_parms_1.GetTCPIPparms());
        Maps.set('getRecordInformation', new get_record_information_1.GetRecordInformation());
        Maps.set('downloadAttendanceRecords', new download_attendance_records_1.DownloadAttendanceRecords());
        Maps.set('uploadRecord', new upload_record_1.UploadRecord());
        Maps.set('clearRecords', new clear_records_1.ClearRecords());
        return Maps;
    };
    return Command;
}());
exports.Command = Command;
