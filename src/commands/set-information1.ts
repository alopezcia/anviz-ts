import { ICommand, IParams, IResponse } from '../icommand';

interface ISetInformationParams extends IParams {
    passwordLength: number;
    password:       number;
    sleepTime:      number;
    volume:         number;
    language:       number;
    dateTimeFormat: number;
    attendanceState:number;
    langSetting:    number;
}

export class SetInformation1 implements ICommand {

    private isCorrectParm( parm: any ): parm is ISetInformationParams {
        return typeof parm.passwordLength === 'number' && parm.password === 'number' &&
                parm.sleepTime === 'number' && parm.volume === 'number' &&
                parm.language === 'number' && parm.dateTimeFormat === 'number' &&
                parm.attendanceState === 'number' && parm.langSetting === 'number';
    }

    public getCmd(): number {
        return 0x31;
    }

    public parseRequest(parms: IParams): Uint8Array {
        if( this.isCorrectParm(parms) ){
            return new Uint8Array();
        } else {
            throw new Error("parameters erroneous.  { passwordLength, password, sleepTime, volume, language, dateTimeFormat, attendanceState, langSetting }");
        }
    }    

    public parseResponse(msg: Uint8Array): IResponse {
        throw new Error("Method not implemented.");
    }
}