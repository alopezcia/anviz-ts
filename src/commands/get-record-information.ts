import { ICommand, IParams, IResponse } from '../icommand';

export class GetRecordInformation implements ICommand {
    public getCmd(): number {
        return 0x3C;
    }
    public parseRequest(parms: IParams): Uint8Array {
        throw new Error("Method not implemented.");
    }    

    public parseResponse(msg: Uint8Array): IResponse {
        throw new Error("Method not implemented.");
    }
}