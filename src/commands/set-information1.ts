import { ICommand } from '../icommand';

export class SetInformation1 implements ICommand {
    request(): Uint8Array {
        throw new Error("Method not implemented.");
    }    
    response(msg: Uint8Array): void {
        throw new Error("Method not implemented.");
    }
}