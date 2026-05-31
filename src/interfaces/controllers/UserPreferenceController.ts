// src/interfaces/controllers/UserPreferenceController.ts
import { Request, Response } from "express";
import { GetUserPreference } from "../../application/use-cases/GetUserPreference";
import { SaveUserPreference } from "../../application/use-cases/SaveUserPreference";

export class UserPreferenceController {
  constructor(
    private getUserPreferenceUseCase: GetUserPreference,
    private saveUserPreferenceUseCase: SaveUserPreference
  ) {}

  // Corregido: Solo un async y formato de método normal
  async getPreferences(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id; 
      
      if (!userId) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      const result = await this.getUserPreferenceUseCase.execute(userId);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Corregido: Solo un async y formato de método normal
  async savePreferences(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      const { selected_character, selected_room, nickname } = req.body;

      if (!selected_character || !selected_room) {
        return res.status(400).json({ error: "Faltan datos de configuración (personaje o sala)" });
      }

      const result = await this.saveUserPreferenceUseCase.execute(
        userId,
        selected_character,
        selected_room,
        nickname
      );
      
      res.status(200).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}