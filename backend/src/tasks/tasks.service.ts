import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(content: string): Task {
    const newTask: Task = {
      id: Date.now(),
      content,
      done: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id: number, done: boolean): Task {
    const taskToUpdate = this.getTaskById(id);
    if (taskToUpdate) {
      taskToUpdate.done = done;
    }
    return taskToUpdate;
  }
}
