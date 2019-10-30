import { ICommand, IParams, IResponse } from '../icommand';

export class GetInformation2 implements ICommand {
    
    public getCmd(): number {
        return 0x32;
    }

    public parseRequest(parms: IParams): Uint8Array {
        return new Uint8Array();
    }    

    public parseResponse(msg: any): IResponse {
        const fingetprintPrecision = msg[0];
        const fixedWiegand = msg[1];
        const wiegandOption  = msg[2];
        const workCode = msg[3];
        const realTimeMode = msg[4];
        const fpAutoUpdate = msg[5];
        const relayMode = msg[6];
        const lockDelay = msg[7];
        const memoryFullAlarm = msg.slice(8, 10);
        const reapeatAttendanceDelay = msg[11];
        const doorSensorDeay = msg[12];
        const scheduledBellDelay = msg[13];
        const reserve = msg[14];

        return { fingetprintPrecision, fixedWiegand, wiegandOption, workCode,
            realTimeMode, fpAutoUpdate, relayMode, lockDelay, memoryFullAlarm, 
            reapeatAttendanceDelay, doorSensorDeay, scheduledBellDelay, reserve };
    }
}