//src/domain/entities/MusicTrack.ts
export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  imageUrl?: string;
  duration?: number;
};