import {ICommand} from './icommand';
import { GetInformation1 } from './commands/get-information1';
import { SetInformation1 } from './commands/set-information1';
import { GetRecordInformation } from './commands/get-record-information';
import { DownloadAttendanceRecords } from './commands/download-attendance-records';

export class Command {
    public static inventory(): Map<string, ICommand> {
        const Maps: Map<string, ICommand> = 
                    new Map<string, ICommand>();
        Maps.set( 'getInformation1', new GetInformation1() );
        Maps.set( 'setInformation1', new SetInformation1() );
        Maps.set( 'getRecordInformation', new GetRecordInformation() );
        Maps.set( 'downloadAttendanceRecords', new DownloadAttendanceRecords() );

        return Maps;
    }
}