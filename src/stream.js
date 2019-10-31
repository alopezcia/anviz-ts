"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var command_1 = require("./command");
var promise_socket_1 = require("promise-socket");
var crc_1 = require("./crc");
var pack_1 = require("./pack");
var AnvizStream = /** @class */ (function () {
    function AnvizStream(host, port, id) {
        this.host = host;
        this.port = port;
        this.id = id;
    }
    AnvizStream.prototype.buildRequest = function (icmd, parms) {
        var arrayCH_CMD_LEN = new Uint8Array(8);
        arrayCH_CMD_LEN[0] = 0xA5;
        var id = pack_1.Pack.packInteger(this.id);
        arrayCH_CMD_LEN[1] = id[0];
        arrayCH_CMD_LEN[2] = id[1];
        arrayCH_CMD_LEN[3] = id[2];
        arrayCH_CMD_LEN[4] = id[3];
        arrayCH_CMD_LEN[5] = icmd.getCmd();
        // Now parser parameters and get parms length
        var dta = icmd.parseRequest(parms);
        // console.log(dta);
        var len = pack_1.Pack.packShort(dta.length);
        arrayCH_CMD_LEN[6] = len[0];
        arrayCH_CMD_LEN[7] = len[1];
        var buff = Buffer.concat([arrayCH_CMD_LEN, dta]);
        // console.log(buff);
        var crc16 = crc_1.CRC.hash(buff);
        var ucrc = new Uint8Array(2);
        ucrc[0] = crc16 % 256;
        ucrc[1] = (crc16 >> 8) % 256;
        //        console.log(ucrc);
        buff = Buffer.concat([buff, ucrc]);
        //        console.log(buff);
        return buff;
    };
    AnvizStream.prototype.send = function (cmd, parms) {
        return __awaiter(this, void 0, void 0, function () {
            var icmd, buffer, socket, num, resp, STX, LEN, DATA, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        icmd = command_1.Command.inventory().get(cmd);
                        if (!icmd) {
                            throw new Error("Not exists the command " + cmd);
                        }
                        buffer = this.buildRequest(icmd, parms);
                        socket = new promise_socket_1.PromiseSocket();
                        return [4 /*yield*/, socket.connect({ port: this.port, host: this.host })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, socket.write(buffer)];
                    case 2:
                        num = _a.sent();
                        return [4 /*yield*/, socket.read()];
                    case 3:
                        resp = _a.sent();
                        STX = resp[0];
                        LEN = resp.readUInt16BE(7, 8);
                        DATA = resp.slice(9, 9 + LEN);
                        // const CRC1 = resp[9+LEN];
                        // const CRC2 = resp[10+LEN];
                        return [4 /*yield*/, socket.end()];
                    case 4:
                        // const CRC1 = resp[9+LEN];
                        // const CRC2 = resp[10+LEN];
                        _a.sent();
                        if (STX === 0xa5) {
                            r = icmd.parseResponse(DATA);
                            // console.log(JSON.stringify(r));
                            return [2 /*return*/, r];
                        }
                        else {
                            throw new Error("Error STX code " + STX);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AnvizStream;
}());
exports.AnvizStream = AnvizStream;
