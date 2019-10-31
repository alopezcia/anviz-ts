const yargs = require('yargs');
import { AnvizStream } from '../src/stream';

const argv = yargs
    .usage('Usage: $0 <command> -i [ipAddress] -p [port] -d [device code] -j [json parameters]')
    .demandOption(['d'])
    .describe('i', 'ipAddress')
    .describe('p', 'port')
    .describe('d', 'device code')
    .describe('j', 'json parameters')
    .default({i:'localhost', p: 5010, j: '{}'})
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2019')    
    .argv;

const ipAddress = argv.i;
const port = argv.p;
const deviceId = argv.d;
let parms = JSON.parse(argv.j);
const command = argv._[0];
const anviz: AnvizStream = new AnvizStream(ipAddress, port, deviceId);

if( command === 'downloadAttendanceRecords' && parms.parameter === 1 ) {
    // Get count atterndes
    anviz.send( 'getRecordInformation', {} )
        .then( (dta: any) => { 
            const count = dta['allRecordAmount'];
            anviz.send('downloadAttendanceRecords', { parameter: 1, recordAmount: count } ).then( kkfu => console.log(kkfu)).catch(kkerr => console.error(kkerr));

        })
        .catch(err=> console.error(err));
} else {
    if( command === 'uploadRecord'  ) {
        parms = { userCode: 449, dateTime: new Date() };
    }
    anviz.send( command, parms )
        .then( dta => console.log(dta))
        .catch(err=> console.error(err));
}
