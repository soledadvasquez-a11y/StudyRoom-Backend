
// infrastructure/external/MusicApiClient.ts (EN TU BACKEND)
import type { MusicRepository, MusicMood } from "../../domain/MusicRepository";
import type { MusicTrack } from "../../domain/entities/MusicTrack";

type JamendoTrack = {
  id: string;
  name: string;
  duration: number;
  audio: string;
  album_image?: string;
  artist_name: string;
};

type JamendoResponse = {
  results: JamendoTrack[];
};

const moodTagMap: Record<MusicMood, string> = {
  lofi: "lofi",
  focus: "piano",
  rain: "ambient",
  cafe: "jazz",
};

export class MusicApiClient implements MusicRepository {
  private readonly baseUrl = "https://api.jamendo.com/v3.0";
  private readonly clientId = process.env.JAMENDO_CLIENT_ID;

  async getTracksByMood(mood: MusicMood): Promise<MusicTrack[]> {
    if (!this.clientId) {
      throw new Error("Falta configurar JAMENDO_CLIENT_ID en el archivo .env");
    }

    const tag = moodTagMap[mood];

    const params = new URLSearchParams({
      client_id: this.clientId,
      format: "json",
      limit: "12",
      tags: tag,
      include: "musicinfo",
      audioformat: "mp32",
      imagesize: "200",
      order: "popularity_total",
    });

    const url = `${this.baseUrl}/tracks/?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("No se pudo obtener música desde Jamendo.");
    }

    const data = (await response.json()) as JamendoResponse;

    return data.results
      .filter((track) => track.audio)
      .map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artist_name,
        audioUrl: track.audio,
        imageUrl: track.album_image,
        duration: track.duration,
      }));
  }
}