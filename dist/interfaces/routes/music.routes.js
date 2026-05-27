"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicRouter = void 0;
//src/interfaces/routes/music.routes.ts
const express_1 = require("express");
const dependencies_1 = require("../../config/dependencies");
exports.musicRouter = (0, express_1.Router)();
exports.musicRouter.get("/mood/:mood", dependencies_1.musicController.getByMood);
