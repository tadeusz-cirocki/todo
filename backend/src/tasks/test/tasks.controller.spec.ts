import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../tasks.controller';
import { TasksService } from '../tasks.service';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', () => {
      const tasks = [{ id: 1, content: 'Task 1', done: false }];
      jest.spyOn(tasksService, 'getAllTasks').mockReturnValue(tasks);

      expect(tasksController.getAllTasks()).toEqual(tasks);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', () => {
      const task = { id: 1, content: 'Task 1', done: false };
      jest.spyOn(tasksService, 'getTaskById').mockReturnValue(task);

      expect(tasksController.getTaskById(1)).toEqual(task);
    });
  });

  describe('createTask', () => {
    it('should create a new task', () => {
      const task = { id: 1, content: 'Task 1', done: false };
      jest.spyOn(tasksService, 'createTask').mockReturnValue(task);

      expect(tasksController.createTask('Task 1')).toEqual(task);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by ID', () => {
      jest.spyOn(tasksService, 'deleteTask').mockReturnValue();

      expect(() => tasksController.deleteTask(1)).not.toThrowError();
    });
  });

  describe('updateTask', () => {
    it('should update a task by ID', () => {
      const task = { id: 1, content: 'Task 1', done: true };
      jest.spyOn(tasksService, 'updateTask').mockReturnValue(task);

      expect(tasksController.updateTask(1, true)).toEqual(task);
    });
  });
});
