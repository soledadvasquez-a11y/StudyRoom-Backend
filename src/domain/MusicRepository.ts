//src/domain/MusicRepository.ts
import type { MusicTrack } from "./entities/MusicTrack";

export type MusicMood = "lofi" | "focus" | "rain" | "cafe";

export interface MusicRepository {
  getTracksByMood(mood: MusicMood): Promise<MusicTrack[]>;
}