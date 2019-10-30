import { ICommand, IParams, IResponse } from '../icommand';

interface ISetInformationParams extends IParams {
    fingetprintPrecision: number;
    fixedWiegand: number;
    wiegandOption: number;
    workCode: number;
    realTimeMode: number;
    fpAutoUpdate: number;
    relayMode: number;
    lockDelay: number;
    memoryFullAlarm: number;
    reapeatAttendanceDelay: number;
    doorSensorDeay: number;
    scheduledBellDelay: number;
}

export class SetInformation2 implements ICommand {

    private isCorrectParm( parm: any ): parm is ISetInformationParams {
        return typeof parm.fingetprintPrecision === 'number' && typeof parm.fixedWiegand === 'number' &&
                typeof parm.wiegandOption === 'number' && typeof parm.workCode === 'number' &&
                typeof parm.realTimeMode === 'number' && typeof parm.fpAutoUpdate === 'number' &&
                typeof parm.relayMode === 'number' && typeof parm.lockDelay === 'number' &&
                typeof parm.memoryFullAlarm === 'number' && typeof parm.reapeatAttendanceDelay === 'number' &&
                typeof parm.doorSensorDeay === 'number' && typeof parm.scheduledBellDelay === 'number';
    }

    public getCmd(): number {
        return 0x33;
    }

    public parseRequest(parms: IParams): Uint8Array {
        if( this.isCorrectParm(parms) ){
            return new Uint8Array(); // TODO
        } else {
            throw new Error("parameters erroneous.  { fingetprintPrecision, fixedWiegand, wiegandOption, workCode, realTimeMode: number, fpAutoUpdate, relayMode, lockDelay, memoryFullAlarm, reapeatAttendanceDelay, doorSensorDeay, scheduledBellDelay }");
        }
    }    

    public parseResponse(msg: any): IResponse {
        throw new Error("Method not implemented.");
    }
}