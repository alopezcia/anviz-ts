import * as net from 'net';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Command } from './command';
import { ICommand } from './icommand';
import { PromiseSocket } from 'promise-socket';
import { CRC } from './crc';

export class AnvizStream {

    private host: string;
    private port: number;
    private id: number;

    public constructor( host: string, port: number, id: number  )
    {
        this.host=host;
        this.port=port;
        this.id = id;
    }

    private buildRequest( icmd: ICommand, parms: any ): Buffer{
        let arrayCH_CMD_LEN = new Uint8Array(8);
        arrayCH_CMD_LEN[0]=0xA5;
        
        let hexStr = this.id.toString(16);
        let b = Buffer.from(hexStr, 'hex');
        let u = Uint8Array.from(b);
        
        if( this.id < 0x100 ){
            arrayCH_CMD_LEN[1]=0;
            arrayCH_CMD_LEN[2]=0;
            arrayCH_CMD_LEN[3]=0;
            arrayCH_CMD_LEN[4]=this.id;
        } else {
            if( this.id < 0x10000 ){
                arrayCH_CMD_LEN[1]=0;
                arrayCH_CMD_LEN[2]=0;
                arrayCH_CMD_LEN[3]=u[0];
                arrayCH_CMD_LEN[4]=u[1];
            } else {
                if( this.id < 0x1000000 ){
                    arrayCH_CMD_LEN[1]=0;
                    arrayCH_CMD_LEN[2]=u[0];
                    arrayCH_CMD_LEN[3]=u[1];
                    arrayCH_CMD_LEN[4]=u[2];
                } else {
                    arrayCH_CMD_LEN[1]=u[0];
                    arrayCH_CMD_LEN[2]=u[1];
                    arrayCH_CMD_LEN[3]=u[2];
                    arrayCH_CMD_LEN[4]=u[3];
                }
            }
        }

        arrayCH_CMD_LEN[5]=icmd.getCmd();
        
        // Now parser parameters and get parms length
        let dta: Uint8Array = icmd.parseRequest( parms );
        console.log(dta);
        const dtaLen = dta.length;
        if (  dtaLen > 0 ){
            hexStr = dtaLen.toString(16);
            b = Buffer.from(hexStr, 'hex');
            u = Uint8Array.from(b);
            if( dtaLen < 0x100 ){
                arrayCH_CMD_LEN[6]=0;
                arrayCH_CMD_LEN[7]=dtaLen;
            } else {
                arrayCH_CMD_LEN[6]=u[0];
                arrayCH_CMD_LEN[7]=u[1];
            }
        } else {
            arrayCH_CMD_LEN[6]=0;
            arrayCH_CMD_LEN[7]=0;
        
        }
        let buff = Buffer.concat([arrayCH_CMD_LEN, dta] );
//        console.log(buff);
        let crc16 = CRC.hash(buff);
        let ucrc = new Uint8Array(2);
        ucrc[0] = crc16 % 256;
        ucrc[1] = (crc16 >> 8) % 256;
        console.log(ucrc);
        buff = Buffer.concat([buff, ucrc]);
        console.log(buff);
        return buff;        
    }

    async send( cmd: string, parms: any ){
        let icmd = Command.inventory().get(cmd);
        if( !icmd ){
            throw new Error(`Not exists the command ${cmd}`);
        }
        // buildRequest
        const buffer = this.buildRequest(icmd, parms); 
        // console.log(buffer);

        const socket: PromiseSocket<net.Socket> = new PromiseSocket();

        await socket.connect({port: this.port, host: this.host});

        const num = await socket.write( buffer );
        // console.log(num);

        const resp: any = await socket.read();


        // Process common response data STX-CH-ACK-RET-LEN
        console.log(resp);
        const STX = resp[0];
        const CH  = resp.readUIntBE(1, 4);
        const ACK = resp[5];
        const RET = resp[6];
        const LEN = resp.readUInt16BE(7, 8);
        const DATA = resp.slice( 9, 9+LEN);
        const CRC1 = resp[9+LEN];
        const CRC2 = resp[10+LEN];

        await socket.end();

        if (STX === 0xa5 ) {
            console.log(`STX: ${STX}, CH: ${CH}, ACK: ${ACK}, RET: ${RET}, LEN ${LEN}, CRC1 ${CRC1}, CRC2 ${CRC2}`);
            let computeCRC = (CRC2<<8) + CRC1;
            let crc16 = CRC.hash(DATA);
            let ucrc = new Uint8Array(2);
            ucrc[0] = crc16 % 256;
            ucrc[1] = (crc16 >> 8) % 256;
    
            console.log('computeCRC', computeCRC);
            console.log('crc16', crc16);
            console.log('ucrc[0]', ucrc[0]);
            console.log('ucrc[1]', ucrc[1]);



            const r = icmd.parseResponse(DATA);
            console.log(JSON.stringify(r));
            return r;
        } else {
            throw new Error( `Error STX code ${STX}` );
        }

    }
}