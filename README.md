# anviz-ts
Project to communicate with Anviz devices.

## :warning: Work in progress :warning:

This is a work in progress, but it's already functional.
I based this project in node-anviz.  

### Argv command line sample

Edit in index.ts:
```js
const yargs = require('yargs');
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
let parms = JSON.parse(argv.j);
const command = argv._[0];
const anviz: AnvizStream = new AnvizStream(ipAddress, port, deviceId);
anviz.send( command, parms )
        .then( dta => console.log(dta))
        .catch(err=> console.error(err));

```
### Buikding typescript and run
tsc -w && nodemon dist/index 



### Sample with arguments
node index  downloadAttendanceRecords -i 172.17.4.228 -d 21 -j "{""parameter"": 1, ""recordAmount"": 25 }"

