import { ICommand, IParams, IResponse } from '../icommand';

export class GetTCPIPparms implements ICommand {
    
    public getCmd(): number {
        return 0x3A;
    }

    public parseRequest(parms: IParams): Uint8Array {
        return new Uint8Array();
    }    

    public parseResponse(msg: any): IResponse {
        const ipAddress = msg[0].toString() + '.' + msg[1].toString() + '.' + msg[2].toString() + '.' + msg[3].toString();
        const subnetMask = msg[4].toString() + '.' +  msg[5].toString() + '.' + msg[6].toString() + '.' + msg[7].toString();
        const macAddress = msg[8].toString(16) + '-' + msg[9].toString(16) + '-' + msg[10].toString(16) + '-' + msg[11].toString(16) + '-' + msg[12].toString(16) + '-' +  msg[13].toString(16);
        const defaultGateway = msg[14].toString() + '.' +  msg[15].toString() + '.' + msg[16].toString() + '.' + msg[17].toString();
        const serverIPAddress = msg[18].toString() + '.' +  msg[19].toString() + '.' + msg[20].toString() + '.' + msg[21].toString();
        const farLimit = msg[22];
        const commPort = msg.readUInt16BE(23, 24);
        const tcpMode = msg[25];
        const dhcpLimit = msg[26];
        return { ipAddress, subnetMask, macAddress, defaultGateway, serverIPAddress, farLimit, commPort, tcpMode, dhcpLimit };
    }
}