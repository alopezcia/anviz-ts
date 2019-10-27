import { ICommand, IParams, IResponse } from '../icommand';

interface IDownloadAttendanceRecordsParams extends IParams {
    parameter: number;
    recordAmount: number;
}

export class DownloadAttendanceRecords implements ICommand {

    private isCorrectParm( parm: any ): parm is IDownloadAttendanceRecordsParams {
        return typeof parm.parameter === 'number' && parm.recordAmount === 'number';
    }

    public getCmd(): number {
        return 0x40;
    }

    public parseRequest(parms: IParams): Uint8Array {
        if( this.isCorrectParm(parms) ){
            return new Uint8Array();
        } else {
            throw new Error("parameters erroneous.  { parameter, recordAmount }");
        }
    }    

    public parseResponse(msg: Uint8Array): IResponse {
        throw new Error("Method not implemented.");
    }
}