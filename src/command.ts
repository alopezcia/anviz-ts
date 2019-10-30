import {ICommand} from './icommand';
import { GetInformation1 } from './commands/get-information1';
import { SetInformation1 } from './commands/set-information1';
import { GetInformation2 } from './commands/get-information2';
import { SetInformation2 } from './commands/set-information2';
import { GetDateTime } from './commands/get-date-time';
import { GetTCPIPparms } from './commands/get-tcp-ip-parms';

import { GetRecordInformation } from './commands/get-record-information';
import { DownloadAttendanceRecords } from './commands/download-attendance-records';
import { UploadRecord } from './commands/upload-record';

export class Command {
    public static inventory(): Map<string, ICommand> {
        const Maps: Map<string, ICommand> = 
                    new Map<string, ICommand>();
        Maps.set( 'getInformation1', new GetInformation1() );
        Maps.set( 'setInformation1', new SetInformation1() );
        Maps.set( 'getInformation2', new GetInformation2() );
        Maps.set( 'setInformation2', new SetInformation2() );
        Maps.set( 'getDateTime', new GetDateTime() );
        Maps.set( 'getTcpipParms', new GetTCPIPparms() );
        Maps.set( 'getRecordInformation', new GetRecordInformation() );
        Maps.set( 'downloadAttendanceRecords', new DownloadAttendanceRecords() );
        Maps.set( 'uploadRecord', new UploadRecord() );

        return Maps;
    }
}