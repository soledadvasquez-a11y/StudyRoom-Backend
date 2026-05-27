"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingRouter = void 0;
const express_1 = require("express");
const PingController_1 = require("../controllers/PingController");
const pingRouter = (0, express_1.Router)();
exports.pingRouter = pingRouter;
const pingController = new PingController_1.PingController();
pingRouter.get('/ping', pingController.ping.bind(pingController));
