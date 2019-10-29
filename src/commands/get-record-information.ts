import { ICommand, IParams, IResponse } from '../icommand';

export class GetRecordInformation implements ICommand {
    public getCmd(): number {
        return 0x3C;
    }
    public parseRequest(parms: IParams): Uint8Array {
        return new Uint8Array();
    }    

    public parseResponse(msg: any): IResponse {
        const userAmount       = msg.readUInt16BE(1, 3);
        const fpAmount         = msg.readUInt16BE(4, 6);
        const passwordAmount   = msg.readUInt16BE(7, 9);
        const cardAmount       = msg.readUInt16BE(10, 12);
        const allRecordAmount  = msg.readUInt16BE(13, 15);
        const newRecordAmount  = msg.readUInt16BE(16, 18);
        return { userAmount, fpAmount, passwordAmount, cardAmount, allRecordAmount, newRecordAmount };
    }
}