import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { PomodoroSessionRepositoryPort } from "../../application/ports/PomodoroSessionRepositoryPort";
import { PomodoroSession } from "../../domain/entities/PomodoroSession";

export class SupabasePomodoroRepository implements PomodoroSessionRepositoryPort {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY!;
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async create(
    session: Omit<PomodoroSession, "id" | "created_at" | "updated_at">,
  ): Promise<PomodoroSession> {
    const { data, error } = await this.client
      .from("pomodoro_sessions")
      .insert({
        user_id: session.user_id,
        start_time: session.start_time,
        end_time: session.end_time,
        status: session.status,
        duration_minutes: session.duration_minutes,
      })
      .select("*")
      .single();

    if (error || !data) {
      const message = error?.message || "No se pudo insertar la sesión";
      throw new Error(`Supabase error: ${message}`);
    }

    return data as PomodoroSession;
  }

  async findByUserId(userId: string): Promise<PomodoroSession[]> {
    const { data, error } = await this.client
      .from("pomodoro_sessions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return (data ?? []) as PomodoroSession[];
  }

  async update(
    id: string,
    updates: Partial<
      Omit<PomodoroSession, "id" | "user_id" | "created_at" | "updated_at">
    >,
  ): Promise<PomodoroSession> {
    const { data, error } = await this.client
      .from("pomodoro_sessions")
      .update({
        ...(updates.status !== undefined ? { status: updates.status } : {}),
        ...(updates.duration_minutes !== undefined
          ? { duration_minutes: updates.duration_minutes }
          : {}),
        ...(updates.start_time !== undefined
          ? { start_time: updates.start_time }
          : {}),
        ...(updates.end_time !== undefined
          ? { end_time: updates.end_time }
          : {}),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data as PomodoroSession;
  }
}
