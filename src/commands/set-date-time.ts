import { ICommand, IParams, IResponse } from '../icommand';

interface ISetDateTimeParams extends IParams {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}

export class SetDateTime implements ICommand {

    private isCorrectParm( parm: any ): parm is ISetDateTimeParams {
        return typeof parm.year === 'number' && typeof parm.month === 'number' &&
                typeof parm.day === 'number' && typeof parm.hour === 'number' &&
                typeof parm.minute === 'number' && typeof parm.second === 'number';
    }

    public getCmd(): number {
        return 0x39;
    }

    public parseRequest(parms: IParams): Uint8Array {
        if( this.isCorrectParm(parms) ){
            return new Uint8Array([parms.year, parms.month, parms.day, parms.hour, parms.minute, parms.second]);
        } else {
            throw new Error("parameters erroneous.  { year, month, day, hour, minute, second }");
        }
    }    

    public parseResponse(msg: any): IResponse {
        throw new Error("Method not implemented.");
    }
}