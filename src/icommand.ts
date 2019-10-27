export interface IParams {
}

export interface IResponse {
}

export interface ICommand {
    getCmd(): number;
    parseRequest( parms: IParams ): Uint8Array;
    parseResponse( msg: Uint8Array ): IResponse;
}