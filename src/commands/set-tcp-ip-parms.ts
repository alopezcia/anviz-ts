import { ICommand, IParams, IResponse } from '../icommand';
import { Pack } from '../pack';

interface ISetTcpIpParams extends IParams {
    ipAddress: string;
    subnetMask: string;
    macAddress: string;
    defaultGateway: string;
    serverIPAddress: string;
    farLimit: number;
    commPort: number;
    tcpMode: number;
    dhcpLimit: number;
}

export class SetDateTime implements ICommand {

    private isCorrectParm( parm: any ): parm is ISetTcpIpParams {
        return typeof parm.ipAddress === 'string' && typeof parm.subnetMask === 'string' &&
                typeof parm.macAddress === 'string' && typeof parm.defaultGateway === 'string' &&
                typeof parm.serverIPAddress === 'string' && typeof parm.farLimit === 'number' &&
                typeof parm.commPort === 'number' && typeof parm.tcpMode === 'number' &&
                typeof parm.dhcpLimit === 'number';
    }

    public getCmd(): number {
        return 0x3B;
    }

    private ip2array( ip: string ): Uint8Array {
        const a = ip.split('.');
        let retval = new Uint8Array(4);
        retval[0]=parseInt(a[0]);
        retval[1]=parseInt(a[1]);
        retval[2]=parseInt(a[2]);
        retval[3]=parseInt(a[3]);
        return retval;
    }

    public parseRequest(parms: IParams): Uint8Array {
        if( this.isCorrectParm(parms) ){
            let retval = new Uint8Array(27);
            const ip = this.ip2array(parms.ipAddress);
            retval[0]=ip[0];
            retval[1]=ip[1];
            retval[2]=ip[2];
            retval[3]=ip[3];
            const mask = this.ip2array(parms.subnetMask);
            retval[4]=mask[0];
            retval[5]=mask[1];
            retval[6]=mask[2];
            retval[7]=mask[3];
            const mac = parms.macAddress.split('-');
            for( let i=0; i<mac.length; i++){
                retval[8+i]= parseInt(mac[i]);
            }
            const gateway=this.ip2array(parms.defaultGateway);
            retval[14]=gateway[0];
            retval[15]=gateway[1];
            retval[16]=gateway[2];
            retval[17]=gateway[3];
            const server = this.ip2array(parms.serverIPAddress);
            retval[18]=server[0];
            retval[19]=server[1];
            retval[20]=server[2];
            retval[21]=server[3];
            retval[22]=parms.farLimit;
            const cp = Pack.packShort( parms.commPort);
            retval[23]=cp[0];
            retval[24]=cp[1];
            retval[25]=parms.tcpMode;
            retval[26]=parms.dhcpLimit;
            return retval;
        } else {
            throw new Error("parameters erroneous.  { year, month, day, hour, minute, second }");
        }
    }    

    public parseResponse(msg: any): IResponse {
        return {};
    }
}