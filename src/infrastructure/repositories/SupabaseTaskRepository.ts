import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { TaskRepository } from "../../application/ports/TaskRepository";
import { TaskEntity } from "../../domain/entities/TaskEntity";

export class SupabaseTaskRepository implements TaskRepository {
  private client: SupabaseClient;

  constructor() {
    // Aquí hacemos exactamente lo mismo que tu compañera
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_ANON_KEY!;
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  // 1. Agregar tarea
  async createTask(task: TaskEntity): Promise<TaskEntity> {
    const { data, error } = await this.client
      .from("tasks")
      .insert({
        user_id: task.user_id,
        title: task.title,
        is_completed: task.is_completed,
      })
      .select()
      .single();

    if (error) throw new Error(`Supabase error al crear tarea: ${error.message}`);
    return data as TaskEntity;
  }

  // 2. Eliminar tarea
  async deleteTask(id: string): Promise<void> {
    const { error } = await this.client
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) throw new Error(`Supabase error al eliminar tarea: ${error.message}`);
  }

  // 3. Actualizar estado de la tarea
  async updateTaskStatus(id: string, isCompleted: boolean): Promise<TaskEntity> {
    const { data, error } = await this.client
      .from("tasks")
      .update({ is_completed: isCompleted })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Supabase error al actualizar tarea: ${error.message}`);
    return data as TaskEntity;
  }

  async getTasksByUserId(userId: string): Promise<TaskEntity[]> {
    const { data, error } = await this.client
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true }); 

    if (error) throw new Error(`Supabase error al obtener tareas: ${error.message}`);
    return data as TaskEntity[];
  }
}