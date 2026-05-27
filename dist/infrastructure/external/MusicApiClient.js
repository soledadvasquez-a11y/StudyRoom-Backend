"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicApiClient = void 0;
const moodTagMap = {
    lofi: "lofi",
    focus: "piano",
    rain: "ambient",
    cafe: "jazz",
};
class MusicApiClient {
    constructor() {
        this.baseUrl = "https://api.jamendo.com/v3.0";
        this.clientId = process.env.JAMENDO_CLIENT_ID;
    }
    async getTracksByMood(mood) {
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
        const data = (await response.json());
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
exports.MusicApiClient = MusicApiClient;
