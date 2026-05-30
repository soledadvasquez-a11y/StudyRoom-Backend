//src/application/use-cases/GetMusicByMoodUseCase.ts
import type { MusicRepository, MusicMood } from "../../domain/MusicRepository";
import type { MusicTrack } from "../../domain/entities/MusicTrack";

export class GetMusicByMoodUseCase {
  constructor(private readonly musicRepository: MusicRepository) {}

  async execute(mood: string): Promise<MusicTrack[]> {
    const allowedMoods: MusicMood[] = ["lofi", "focus", "rain", "cafe"];

    if (!allowedMoods.includes(mood as MusicMood)) {
      throw new Error("Mood de música no válido.");
    }

    return this.musicRepository.getTracksByMood(mood as MusicMood);
  }
}