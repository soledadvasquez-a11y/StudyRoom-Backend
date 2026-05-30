//src/interfaces/controllers/MusicController.ts
import type { Request, Response } from "express";
import { GetMusicByMoodUseCase } from "../../application/use-cases/GetMusicByMoodUseCase";

export class MusicController {
  constructor(private readonly getMusicByMoodUseCase: GetMusicByMoodUseCase) {}

  getByMood = async (req: Request, res: Response) => {
    try {
      const mood = String(req.params.mood || "");
      const tracks = await this.getMusicByMoodUseCase.execute(mood);

      return res.status(200).json({
        success: true,
        data: tracks,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "No se pudo cargar la música para esta vibra.",
      });
    }
  };
}