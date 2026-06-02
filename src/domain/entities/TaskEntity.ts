export interface TaskEntity {
  id?: string; 
  user_id: string;
  title: string;
  is_completed: boolean;
  created_at?: Date;
}