import { ICommand, IParams, IResponse } from '../icommand';
import { Pack } from '../pack';

interface IClearRecordsParams extends IParams {
    clearAll: boolean;
    amount: number;
}

export class ClearRecords implements ICommand {

    private isCorrectParm( parm: any ): parm is IClearRecordsParams {
        return typeof parm.clearAll === 'boolean' && typeof parm.amount === 'number';
    }

    public getCmd(): number {
        return 0x4E;
    }

    public parseRequest(parms: IParams): Uint8Array {
        if( this.isCorrectParm(parms) ){
            let record = new Uint8Array(4);
            if( parms.clearAll ){
                record[0]=0;
                record[1]=0;
                record[2]=0;
                record[3]=0;
            } else {
                if( parms.amount > 0 ){
                    record[0]=2;
                    const a = Pack.packInteger(parms.amount);
                    record[1] = a[1];
                    record[2] = a[2];
                    record[3] = a[3];
                } else {
                    record[0]=1;
                    record[1]=0;
                    record[2]=0;
                    record[3]=0;
                }
            }
            return record;
        } else {
            throw new Error("parameters erroneous.  { clearAll, amount }");
        }
    }    

    public parseResponse(msg: any): IResponse {
        return { amountDelete: msg.readUInt16BE(0, 2) };
    }
}