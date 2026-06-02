import { TaskEntity } from '../../domain/entities/TaskEntity';

export interface TaskRepository {
  getTasksByUserId(userId: string): Promise<TaskEntity[]>;
  createTask(task: TaskEntity): Promise<TaskEntity>;
  deleteTask(id: string): Promise<void>;
  updateTaskStatus(id: string, is_completed: boolean): Promise<TaskEntity>;
}