import { ICommand, IParams, IResponse } from '../icommand';

export class GetDateTime implements ICommand {
    
    public getCmd(): number {
        return 0x38;
    }

    public parseRequest(parms: IParams): Uint8Array {
        return new Uint8Array();
    }    

    public parseResponse(msg: any): IResponse {
        const year = msg[0];
        const month = msg[1];
        const day = msg[2];
        const hours = msg[3];
        const minutes = msg[4];
        const seconds = msg[5];
        return { year, month, day, hours, minutes, seconds };
    }
}