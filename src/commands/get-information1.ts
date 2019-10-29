import { ICommand, IParams, IResponse } from '../icommand';

export class GetInformation1 implements ICommand {
    
    public getCmd(): number {
        return 0x30;
    }

    public parseRequest(parms: IParams): Uint8Array {
        return new Uint8Array();
    }    

    public parseResponse(msg: any): IResponse {
        const firmwareVersion = msg.slice(0,7).toString();
        const passlength = msg[8] >> 4;
        const communicationPass = msg.slice(9,10).toString();
        const sleepTime  = msg[11];
        const volume = msg[12];
        const language = msg[13];
        const dateTimeFormat = msg[14];
        const attendanceState = msg[15];
        const languageSettingFlag = msg[16];
        const commandVersion = msg[17];
        return { firmwareVersion, passlength, communicationPass, sleepTime, volume, language, dateTimeFormat, attendanceState, languageSettingFlag, commandVersion };
    }
}