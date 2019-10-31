"use strict";
exports.__esModule = true;
var yargs = require('yargs');
var stream_1 = require("../lib/stream");
var argv = yargs
    .usage('Usage: $0 <command> -i [ipAddress] -p [port] -d [device code] -j [json parameters]')
    .demandOption(['d'])
    .describe('i', 'ipAddress')
    .describe('p', 'port')
    .describe('d', 'device code')
    .describe('j', 'json parameters')["default"]({ i: 'localhost', p: 5010, j: '{}' })
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2019')
    .argv;
var ipAddress = argv.i;
var port = argv.p;
var deviceId = argv.d;
var parms = JSON.parse(argv.j);
var command = argv._[0];
var anviz = new stream_1.AnvizStream(ipAddress, port, deviceId);
if (command === 'downloadAttendanceRecords' && parms.parameter === 1) {
    // Get count atterndes
    anviz.send('getRecordInformation', {})
        .then(function (dta) {
        var count = dta['allRecordAmount'];
        anviz.send('downloadAttendanceRecords', { parameter: 1, recordAmount: count }).then(function (kkfu) { return console.log(kkfu); })["catch"](function (kkerr) { return console.error(kkerr); });
    })["catch"](function (err) { return console.error(err); });
}
else {
    if (command === 'uploadRecord') {
        parms = { userCode: 449, dateTime: new Date() };
    }
    anviz.send(command, parms)
        .then(function (dta) { return console.log(dta); })["catch"](function (err) { return console.error(err); });
}
