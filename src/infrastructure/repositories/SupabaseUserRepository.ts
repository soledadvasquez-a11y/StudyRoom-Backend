// archivo de src/infrastructure/repositories/SupabaseUserRepository.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { UserRepositoryPort } from "../../application/ports/UserRepositoryPort";
import { UserEntity } from "../../domain/entities/UserEntity";

export class SupabaseUserRepository implements UserRepositoryPort {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_ANON_KEY!;
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    if (!email) return null;

    const { data, error } = await this.client
      .from("users")
      .select("id,email,username,password")
      .eq("email", email)
      .maybeSingle();

    if (error) throw new Error(`Supabase error: ${error.message}`);
    if (!data) return null;
    return data as UserEntity;
  }

  async create(user: Omit<UserEntity, "id">): Promise<UserEntity> {
    const { data, error } = await this.client
      .from("users")
      .insert({
        email: user.email,
        username: user.username,
        password: user.password,
      })
      .select("id,email,username")
      .single();

    if (error) throw new Error(`Supabase error: ${error.message}`);
    return data as UserEntity;
  }
}
