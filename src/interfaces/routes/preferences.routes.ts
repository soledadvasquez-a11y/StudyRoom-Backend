// src/interfaces/routes/preferences.routes.ts
import { Router } from "express";
import { SupabaseUserPreferenceRepository } from "../../infrastructure/repositories/SupabaseUserPreferenceRepository";
import { GetUserPreference } from "../../application/use-cases/GetUserPreference";
import { SaveUserPreference } from "../../application/use-cases/SaveUserPreference";
import { UserPreferenceController } from "../controllers/UserPreferenceController";

export const preferencesRouter = Router();

// 1. Instanciar Repositorio y Casos de Uso
const preferenceRepo = new SupabaseUserPreferenceRepository();
const getPreferenceUseCase = new GetUserPreference(preferenceRepo);
const savePreferenceUseCase = new SaveUserPreference(preferenceRepo);

// 2. Instanciar Controlador
const preferenceController = new UserPreferenceController(getPreferenceUseCase, savePreferenceUseCase);

// 3. Definir Rutas (Envolvemos en arrow functions para mantener el contexto 'this' de la clase)
// NOTA: Si tienes un middleware para verificar el token JWT, deberías agregarlo aquí como segundo parámetro
preferencesRouter.get("/", (req, res) => preferenceController.getPreferences(req, res));
preferencesRouter.post("/", (req, res) => preferenceController.savePreferences(req, res));