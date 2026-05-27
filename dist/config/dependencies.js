"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicController = void 0;
//src/config/dependencies.ts
const MusicApiClient_1 = require("../infrastructure/external/MusicApiClient");
const GetMusicByMoodUseCase_1 = require("../application/use-cases/GetMusicByMoodUseCase");
const MusicController_1 = require("../interfaces/controllers/MusicController");
const musicRepository = new MusicApiClient_1.MusicApiClient();
const getMusicByMoodUseCase = new GetMusicByMoodUseCase_1.GetMusicByMoodUseCase(musicRepository);
exports.musicController = new MusicController_1.MusicController(getMusicByMoodUseCase);
