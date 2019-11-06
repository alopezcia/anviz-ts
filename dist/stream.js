"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
class AnvizStream {
    constructor(host, port, id) {
        this.connected = false;
        this.id = id;
        this.socket = new net_1.Socket();
        this.socket.connect({ host, port }, () => this.connected = true);
    }
}
exports.AnvizStream = AnvizStream;
