//src/config/dependencies.ts
import { MusicApiClient } from "../infrastructure/external/MusicApiClient";
import { GetMusicByMoodUseCase } from "../application/use-cases/GetMusicByMoodUseCase";
import { MusicController } from "../interfaces/controllers/MusicController";

const musicRepository = new MusicApiClient();

const getMusicByMoodUseCase = new GetMusicByMoodUseCase(musicRepository);

export const musicController = new MusicController(getMusicByMoodUseCase);