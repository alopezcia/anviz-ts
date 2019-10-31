import { ICommand, IParams, IResponse } from '../icommand';
import { Pack } from '../pack';

interface IUploadRecordParams extends IParams {
    userCode: number;
    dateTime: Date;
}

export class UploadRecord implements ICommand {

    private isCorrectParm( parm: any ): parm is IUploadRecordParams {
        return typeof parm.userCode === 'number' && typeof parm.dateTime === 'object';
    }

    public getCmd(): number {
        return 0x41;
    }

    public parseRequest(parms: IParams): Uint8Array {
        if( this.isCorrectParm(parms) ){
            let record = new Uint8Array(14);
            record[0]=0;
            const userCode = Pack.packInteger( parms.userCode );
            record[1]=userCode[0];
            record[2]=userCode[1];
            record[3]=userCode[2];
            record[4]=userCode[3];

            // Attention with UTC date
            const diff = parms.dateTime.getHours() - parms.dateTime.getUTCHours();
            let recordEpoch: Date;
            if( diff === 1 ){
                recordEpoch = new Date("2000-01-02 00:00:00");
            } else {
                recordEpoch = new Date("2000-01-01 23:00:00");
            }
            const dd = Math.trunc((parms.dateTime.getTime() - (recordEpoch.getTime())) / 1000);
            const dateTime = Pack.packInteger( dd );
            record[5]=dateTime[0];
            record[6]=dateTime[1];
            record[7]=dateTime[2];
            record[8]=dateTime[3];

            record[9]=0x08;
            record[10]=0x80;
            record[11]=0;
            record[12]=0;

            return record;
        } else {
            throw new Error("parameters erroneous.  { userCode, dateTime }");
        }
    }    

    public parseResponse(msg: any): IResponse {
            return {};
    }
}