"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMusicByMoodUseCase = void 0;
class GetMusicByMoodUseCase {
    constructor(musicRepository) {
        this.musicRepository = musicRepository;
    }
    async execute(mood) {
        const allowedMoods = ["lofi", "focus", "rain", "cafe"];
        if (!allowedMoods.includes(mood)) {
            throw new Error("Mood de música no válido.");
        }
        return this.musicRepository.getTracksByMood(mood);
    }
}
exports.GetMusicByMoodUseCase = GetMusicByMoodUseCase;
