import { ICommand, IParams, IResponse } from '../icommand';
import { Pack } from '../pack';

interface IStaffInfoParams extends IParams {
    parameter: number;
    amount: number;
}

export class DownloadStaffInfo implements ICommand {

    private isCorrectParm( parm: any ): parm is IStaffInfoParams {
        return typeof parm.parameter === 'number' && typeof parm.amount === 'number';
    }

    public getCmd(): number {
        return 0x42;
    }


    public parseRequest(parms: IParams): Uint8Array {
        if( this.isCorrectParm(parms) ){
            let retval = new Uint8Array(2);
            retval[0]=parms.parameter;
            retval[1]=parms.amount;
            return retval;
        } else {
            throw new Error("parameters erroneous.  { parameter, amount }");
        }
    }    

    public parseResponse(msg: any): IResponse {
        if( msg.length < 27 ) {
            return {};
        }
// console.log(msg.length);
        const numRecs = msg[0];
// console.log(numRecs);
        let records=[];
        for( let i=0; i<numRecs; i ++){
            let record = msg.slice( 1+(i*27), 27+(i*27) );
            let userCode = record.readUInt32BE(1, 4);
            let numberPwd = record.readUInt32BE(5, 7);
            let carCode = record.slice(8, 10); 
            let name = record.slice(11, 20);
            let department = record[21];
            let group = record[22];
            let attenMode = record[23];
            let regisFP = record.slice(24, 25);
            let special = record[26];
            records.push( {userCode, numberPwd, carCode, name, department, group, attenMode, regisFP, special});
        }
        return records;
    }
}