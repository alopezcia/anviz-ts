"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ACK;
(function (ACK) {
    ACK[ACK["SUCCESS"] = 0] = "SUCCESS";
    ACK[ACK["FAIL"] = 1] = "FAIL";
    ACK[ACK["FULL"] = 4] = "FULL";
    ACK[ACK["EMPTY"] = 5] = "EMPTY";
    ACK[ACK["NO_USER"] = 6] = "NO_USER";
    ACK[ACK["TIME_OUT"] = 8] = "TIME_OUT";
    ACK[ACK["USER_OCCUPIED"] = 10] = "USER_OCCUPIED";
    ACK[ACK["FINGER_OCCUPIED"] = 11] = "FINGER_OCCUPIED"; //fingerprint already exists    
})(ACK = exports.ACK || (exports.ACK = {}));
