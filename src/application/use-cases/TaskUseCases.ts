import { TaskEntity } from '../../domain/entities/TaskEntity';
import { TaskRepository } from '../ports/TaskRepository';

export class TaskUseCases {
  // Inyectamos el repositorio a través del constructor. 
  // Esto permite que el caso de uso no sepa si usamos Supabase, MySQL o un archivo de texto.
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  // 1. Caso de Uso: Agregar tarea
  async createTask(userId: string, title: string): Promise<TaskEntity> {
    // Agregar reglas de negocio o validaciones
    if (!title || title.trim() === '') {
      throw new Error('El título de la tarea no puede estar vacío.');
    }

    if (!userId) {
      throw new Error('Se requiere el ID del usuario para crear una tarea.');
    }

    const newTask: TaskEntity = {
      user_id: userId,
      title: title.trim(),
      is_completed: false, // Por defecto, una tarea nueva está pendiente
    };

    return await this.taskRepository.createTask(newTask);
  }

  // 2. Caso de Uso: Eliminar tarea
  async deleteTask(taskId: string): Promise<void> {
    if (!taskId) {
      throw new Error('Se requiere el ID de la tarea para eliminarla.');
    }

    return await this.taskRepository.deleteTask(taskId);
  }

  // 3. Caso de Uso: Marcar tarea como completada o pendiente
  async toggleTaskStatus(taskId: string, isCompleted: boolean): Promise<TaskEntity> {
    if (!taskId) {
      throw new Error('Se requiere el ID de la tarea para actualizar su estado.');
    }

    // Si tuvieras reglas como "no se puede reabrir una tarea de hace un mes", irían aquí.
    
    return await this.taskRepository.updateTaskStatus(taskId, isCompleted);
  }

  async getTasks(userId: string): Promise<TaskEntity[]> {
    if (!userId) throw new Error('Se requiere el ID del usuario.');
    return await this.taskRepository.getTasksByUserId(userId);
  }
}