import { Request, Response } from 'express';
import { TaskUseCases } from '../../application/use-cases/TaskUseCases';

export class TaskController {
  private taskUseCases: TaskUseCases;

  constructor(taskUseCases: TaskUseCases) {
    this.taskUseCases = taskUseCases;
  }
  
  // 1. Controlador para agregar tarea
  createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      // Extraemos los datos que envía el frontend (React) en el cuerpo de la petición
      const { user_id, title } = req.body;
      
      const newTask = await this.taskUseCases.createTask(user_id, title);
      
      // 201 significa "Creado exitosamente"
      res.status(201).json(newTask);
    } catch (error: any) {
      // 400 significa "Hubo un error con los datos enviados"
      res.status(400).json({ error: error.message });
    }
  };

// 2. Controlador para eliminar tarea
  deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      // Le decimos a TypeScript: "Confía en mí, este id es un string"
      const id = req.params.id as string;
      
      await this.taskUseCases.deleteTask(id);
      
      res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  // 3. Controlador para actualizar estado
  toggleStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      // Aplicamos la misma corrección aquí
      const id = req.params.id as string; 
      const { is_completed } = req.body; 
      
      const updatedTask = await this.taskUseCases.toggleTaskStatus(id, is_completed);
      
      res.status(200).json(updatedTask);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  
  getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId as string;
      const tasks = await this.taskUseCases.getTasks(userId);
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}