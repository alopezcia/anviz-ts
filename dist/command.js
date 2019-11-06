"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_information1_1 = require("./commands/get-information1");
const set_information1_1 = require("./commands/set-information1");
const get_record_information_1 = require("./commands/get-record-information");
const download_attendance_records_1 = require("./commands/download-attendance-records");
class Command {
    static inventory() {
        const Maps = new Map();
        Maps.set('getInformation1', new get_information1_1.GetInformation1());
        Maps.set('setInformation1', new set_information1_1.SetInformation1());
        Maps.set('getRecordInformation', new get_record_information_1.GetRecordInformation());
        Maps.set('downloadAttendanceRecords', new download_attendance_records_1.DownloadAttendanceRecords());
        return Maps;
    }
}
exports.Command = Command;
