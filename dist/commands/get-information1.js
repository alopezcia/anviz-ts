"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetInformation1 {
    getCmd() {
        return 0x30;
    }
    parseRequest(parms) {
        return new Uint8Array();
    }
    parseResponse(msg) {
        throw new Error("Method not implemented.");
    }
}
exports.GetInformation1 = GetInformation1;
