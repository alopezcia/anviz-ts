const yargs = require('yargs');
import { Command } from './command';
import { ICommand } from './icommand';
import { CRC } from './crc';
import { AnvizStream } from './stream';

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
const parms = JSON.parse(argv.j);
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
    anviz.send( command, parms )
    .then( dta => console.log(dta))
    .catch(err=> console.error(err));
}



// let icommand: any = Command.inventory().get(command);
// if( !icommand ){
//     console.error(`Bad command specified: ${command}`);
//     process.exit(1);
// }
// let cmd = icommand.getCmd();

// let arrayCH_CMD_LEN = new Uint8Array(8);
// arrayCH_CMD_LEN[0]=0xA5;

// const deviceCode=argv.d;
// // console.log('Device code:', deviceCode);
// let hexStr = deviceCode.toString(16);
// // console.log( 'hexStr: ', '0x'+hexStr);
// let b = Buffer.from(hexStr, 'hex');
// // console.log('Buffer', b );
// let u = Uint8Array.from(b);
// //console.log('u', u);
// // console.log('n unsigned short (16) big endian->', Serializer.pack('n', deviceCode));


// if( deviceCode < 0x100 ){
//     arrayCH_CMD_LEN[1]=0;
//     arrayCH_CMD_LEN[2]=0;
//     arrayCH_CMD_LEN[3]=0;
//     arrayCH_CMD_LEN[4]=deviceCode;
// } else {
//     if( deviceCode < 0x10000 ){
//         arrayCH_CMD_LEN[1]=0;
//         arrayCH_CMD_LEN[2]=0;
//         arrayCH_CMD_LEN[3]=u[0];
//         arrayCH_CMD_LEN[4]=u[1];
//     } else {
//         if( deviceCode < 0x1000000 ){
//             arrayCH_CMD_LEN[1]=0;
//             arrayCH_CMD_LEN[2]=u[0];
//             arrayCH_CMD_LEN[3]=u[1];
//             arrayCH_CMD_LEN[4]=u[2];
//         } else {
//             arrayCH_CMD_LEN[1]=u[0];
//             arrayCH_CMD_LEN[2]=u[1];
//             arrayCH_CMD_LEN[3]=u[2];
//             arrayCH_CMD_LEN[4]=u[3];
//         }
//     }
// }
// arrayCH_CMD_LEN[5]=cmd;

// // Now parser parameters and get parms length
// let dta: Uint8Array = icommand.parseRequest( parms );
// const dtaLen = dta.length;
// if (  dtaLen > 0 ){
//     hexStr = dtaLen.toString(16);
//     b = Buffer.from(hexStr, 'hex');
//     u = Uint8Array.from(b);
//     if( dtaLen < 0x100 ){
//         arrayCH_CMD_LEN[6]=0;
//         arrayCH_CMD_LEN[7]=dtaLen;
//     } else {
//         arrayCH_CMD_LEN[6]=u[0];
//         arrayCH_CMD_LEN[7]=u[1];
//     }
// } else {
//     arrayCH_CMD_LEN[6]=0;
//     arrayCH_CMD_LEN[7]=0;

// }
// let buff = Buffer.concat([arrayCH_CMD_LEN, dta] );
// // console.log(buff);
// let crc16 = CRC.hash(buff);
// // console.log(crc16);
// buff = Buffer.concat([buff, crc16]);
// console.log(buff);


// if( numero < 256 )
//     console.log('c unsigned short (8)->', Serializer.pack('c', numero));

// if( numero < 0x010000 ) {
//     console.log('n unsigned short (16) big endian->', Serializer.pack('n', numero));
//     console.log('v unsigned short (16) little endian ->', Serializer.pack('v', numero));
//     console.log('S unsigned short (16) machine ->', Serializer.pack('S', numero));
// }


// console.log('N unsigned long (32) big endian->', Serializer.pack('N', numero));
// console.log('V unsigned long (32) little endian->', Serializer.pack('V', numero));
// console.log('L unsigned long (32) machine->', Serializer.pack('L', numero));

// console.log('h ->', Serializer.pack('h*', hexStr));
// console.log('H->', Serializer.pack('H*', hexStr));
// console.log('Q unsigned large long (64) machine->', Serializer.pack('Q', argv.n));
