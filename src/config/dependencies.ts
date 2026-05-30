//src/config/dependencies.ts
import { MusicApiClient } from "../infrastructure/external/MusicApiClient";
import { GetMusicByMoodUseCase } from "../application/use-cases/GetMusicByMoodUseCase";
import { MusicController } from "../interfaces/controllers/MusicController";

import { SupabaseUserRepository } from "../infrastructure/repositories/SupabaseUserRepository";
import { RegisterUser } from "../application/use-cases/RegisterUser";
import { LoginUser } from "../application/use-cases/LoginUser";
import { AuthController } from "../interfaces/controllers/AuthController";

import { PingController } from "../interfaces/controllers/PingController";

// Music
const musicRepository = new MusicApiClient();
const getMusicByMoodUseCase = new GetMusicByMoodUseCase(musicRepository);
export const musicController = new MusicController(getMusicByMoodUseCase);

// Auth
const userRepository = new SupabaseUserRepository();
const registerUseCase = new RegisterUser(userRepository);
const loginUseCase = new LoginUser(userRepository);
export const authController = new AuthController(registerUseCase, loginUseCase);

// Ping
export const pingController = new PingController();