import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body('content') content: string): Task {
    return this.tasksService.createTask(content);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): void {
    this.tasksService.deleteTask(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body('done') done: boolean): Task {
    return this.tasksService.updateTask(id, done);
  }
}
