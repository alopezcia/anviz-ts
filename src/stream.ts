import * as net from 'net';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Command } from './command';
import { ICommand } from './icommand';
import { PromiseSocket } from 'promise-socket';
import { CRC } from './crc';

export class AnvizStream {

    private socket: PromiseSocket<net.Socket>;
    private host: string;
    private port: number;
    private id: number;
    private icmd: any;
//    private connected: boolean;

    public constructor( host: string, port: number, id: number, cmd: string  )
    {
//        this.connected = false;
        this.host=host;
        this.port=port;
        this.id = id;
        this.icmd = Command.inventory().get(cmd);
        if( !this.icmd ){
            throw new Error(`Not exists the command ${cmd}`);
        }
        this.socket = new PromiseSocket();
    }

    private buildRequest( parms: any ): Buffer{
        let arrayCH_CMD_LEN = new Uint8Array(8);
        arrayCH_CMD_LEN[0]=0xA5;
        
        let hexStr = this.id.toString(16);
//        console.log( 'hexStr: ', '0x'+hexStr);
        let b = Buffer.from(hexStr, 'hex');
//        console.log('Buffer', b );
        let u = Uint8Array.from(b);
//        console.log('u', u);
        
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

        arrayCH_CMD_LEN[5]=this.icmd.getCmd();
        
        // Now parser parameters and get parms length
        let dta: Uint8Array = this.icmd.parseRequest( parms );
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
//        console.log(crc16);
        buff = Buffer.concat([buff, crc16]);
//        console.log(buff);
        return buff;        
    }

    async send( parms: any ){
        // buildRequest
        const buffer = this.buildRequest(parms); 
        // console.log(buffer);

        await this.socket.connect({port: this.port, host: this.host});

        const num = await this.socket.write( buffer );
        // console.log(num);

        const resp: any = await this.socket.read();

        await this.socket.end();

        // Process common response data STX-CH-ACK-RET-LEN
        console.log(resp);
        const STX = resp[0];
        const CH  = resp.readUIntBE(1, 4);
        const ACK = resp[5];
        const RET = resp[6];
        const LEN = resp.readUInt16BE(7, 8);
        const DATA = resp.slice( 9, 9+LEN);
        if (STX === 0xa5 ) {
            console.log(`STX: ${STX}, CH: ${CH}, ACK: ${ACK}, RET: ${RET}, LEN ${LEN}`);
            const r = this.icmd.parseResponse(DATA);
            console.log(JSON.stringify(r));
            return r;
        } else {
            throw new Error( `Error STX code ${STX}` );
        }

    }
}