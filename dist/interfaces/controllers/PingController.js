"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingController = void 0;
class PingController {
    ping(req, res) {
        res.status(200).json({ status: 'ok', timestamp: new Date() });
    }
}
exports.PingController = PingController;
