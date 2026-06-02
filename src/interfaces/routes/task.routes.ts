// src/interfaces/routes/task.routes.ts
import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { TaskUseCases } from '../../application/use-cases/TaskUseCases';
import { SupabaseTaskRepository } from '../../infrastructure/repositories/SupabaseTaskRepository';

const taskRouter = Router();

// Instanciamos todas las piezas de la arquitectura hexagonal
const taskRepo = new SupabaseTaskRepository();
const taskUseCases = new TaskUseCases(taskRepo);
const taskController = new TaskController(taskUseCases);

// Usamos .bind() para mantener la consistencia con el estilo de tu equipo
taskRouter.post('/', taskController.createTask.bind(taskController));
taskRouter.delete('/:id', taskController.deleteTask.bind(taskController));
taskRouter.patch('/:id/status', taskController.toggleStatus.bind(taskController));
taskRouter.get('/user/:userId', taskController.getTasks.bind(taskController));

export { taskRouter };