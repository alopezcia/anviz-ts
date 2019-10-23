import { Socket } from 'net';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Command } from './command';
import { ICommand } from './icommand';

export class AnvizStream {
    private socket: Socket;
    private id: number;
    private connected: boolean;

    constructor( host: string, port: number, id: number )
    {
        this.connected = false;
        this.id = id;
        this.socket = new Socket();
        this.socket.connect( {host, port}, ()=> this.connected = true );
    }

    execute(cmd: string, parms: any ): Observable<any> {
        if( !this.connected ){
            throw new Error('Not Socket conected');
        }
        const mp: Map<string, ICommand> = Command.inventory();
        let icmd: any = mp.get(cmd);
        if( !icmd ){
            throw new Error(`Not exists the command ${cmd}`);
        }
        this.socket.write(icmd.request(), (err) => {
            throw err;
        });
        const stream = fromEvent<Socket>(this.socket, 'data')
                            .pipe(map(icmd.response));
        return stream;
    }
}