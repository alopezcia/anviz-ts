import { ICommand, IParams, IResponse } from '../icommand';

export class GetInformation1 implements ICommand {
    
    public getCmd(): number {
        return 0x30;
    }

    public parseRequest(parms: IParams): Uint8Array {
        return new Uint8Array();
    }    

    public parseResponse(msg: Uint8Array): IResponse {
        throw new Error("Method not implemented.");
    }
}