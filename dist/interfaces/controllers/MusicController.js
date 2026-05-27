"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicController = void 0;
class MusicController {
    constructor(getMusicByMoodUseCase) {
        this.getMusicByMoodUseCase = getMusicByMoodUseCase;
        this.getByMood = async (req, res) => {
            try {
                const mood = String(req.params.mood || "");
                const tracks = await this.getMusicByMoodUseCase.execute(mood);
                return res.status(200).json({
                    success: true,
                    data: tracks,
                });
            }
            catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "No se pudo cargar la música para esta vibra.",
                });
            }
        };
    }
}
exports.MusicController = MusicController;
