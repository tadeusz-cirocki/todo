import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
    try {
      return this.tasksService.getAllTasks();
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  getTaskById(@Param('id') id: number): Task {
    try {
      const task = this.tasksService.getTaskById(id);
      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  createTask(@Body('content') content: string): Task {
    try {
      return this.tasksService.createTask(content);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): void {
    try {
      const deleted = this.tasksService.deleteTask(id);
      if (!deleted) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body('done') done: boolean): Task {
    try {
      const updatedTask = this.tasksService.updateTask(id, done);
      if (!updatedTask) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      return updatedTask;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
