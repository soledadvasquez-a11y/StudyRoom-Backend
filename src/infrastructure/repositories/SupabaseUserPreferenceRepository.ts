import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { UserPreferenceRepositoryPort } from "../../application/ports/UserPreferenceRepositoryPort";
import { UserPreferenceEntity } from "../../domain/entities/UserPreferenceEntity";

export class SupabaseUserPreferenceRepository implements UserPreferenceRepositoryPort {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_ANON_KEY!;
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async findByUserId(userId: string): Promise<UserPreferenceEntity | null> {
    if (!userId) return null;

    const { data, error } = await this.client
      .from("user_preferences")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw new Error(`Supabase error al obtener preferencias: ${error.message}`);
    return data as UserPreferenceEntity | null;
  }

  async upsert(preference: Omit<UserPreferenceEntity, "id" | "created_at" | "updated_at">): Promise<UserPreferenceEntity> {
    const { data, error } = await this.client
      .from("user_preferences")
      .upsert(
        {
          user_id: preference.user_id,
          selected_character: preference.selected_character,
          selected_room: preference.selected_room,
          nickname: preference.nickname,
          updated_at: new Date().toISOString() // Actualizamos la fecha de modificación
        },
        { onConflict: 'user_id' } // Le decimos que resuelva conflictos usando el user_id
      )
      .select()
      .single();

    if (error) throw new Error(`Supabase error al guardar preferencias: ${error.message}`);
    return data as UserPreferenceEntity;
  }
}