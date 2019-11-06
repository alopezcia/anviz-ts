import { ICommand, IParams, IResponse } from '../icommand';

interface IDownloadAttendanceRecordsParams extends IParams {
    parameter: number;
    recordAmount: number;
}

export class DownloadAttendanceRecords implements ICommand {

    private isCorrectParm( parm: any ): parm is IDownloadAttendanceRecordsParams {
        return typeof parm.parameter === 'number' && typeof parm.recordAmount === 'number';
    }

    public getCmd(): number {
        return 0x40;
    }

    public parseRequest(parms: IParams): Uint8Array {
        if( this.isCorrectParm(parms) ){
            return new Uint8Array([parms.parameter, parms.recordAmount]);
        } else {
            throw new Error("parameters erroneous.  { parameter, recordAmount }");
        }
    }    

    public parseResponse(msg: any): IResponse {
        if( msg.length < 14 ) {
            return {};
        }
// console.log(msg.length);
        const numRecs = msg[0];
// console.log(numRecs);
        let records=[];
        for( let i=0; i<numRecs; i ++){
            let record = msg.slice( 1+(i*14), 14+(i*14) );
            let userCode = record.readUInt32BE(1, 4);
            let dateU = record.readUInt32BE(5, 8);
            let date = new Date((new Date("2000-01-02 01:00:00").getTime()) + dateU*1000);
            let backup = record[9];
            let recordType = record[10];
            let workTypes = record.readUInt16BE(11, 13);
            records.push( {userCode, date, backup, recordType, workTypes});
        }
        return records;
    }
}