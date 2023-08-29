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

  deleteTask(id: number): Task | null {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));
    if (taskIndex === -1) {
      return null;
    }

    const deletedTask = this.tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }

  updateTask(id: number, done: boolean): Task {
    const taskToUpdate = this.getTaskById(Number(id));
    if (taskToUpdate) {
      taskToUpdate.done = done;
    }
    return taskToUpdate;
  }
}
