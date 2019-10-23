export interface ICommand {
    request(): Uint8Array;
    response(msg: Uint8Array): void;
}