import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import DeleteTask from './components/DeleteTask';
import Task from './interfaces/Task';
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from './services/TasksService';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    getAllTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error('Błąd podczas pobierania zadań:', error));
  }, []);

  const handleAddTask = (content: string) => {
    if (content.trim() !== '') {
      createTask(content)
        .then((data) => {
          setTasks([...tasks, data]);
        })
        .catch((error) => console.error('Błąd podczas tworzenia zadania:', error));
    }
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        setTaskToDelete(null);
      })
      .catch((error) => console.error('Błąd podczas usuwania zadania:', error));
  };

  const handleToggleTask = (taskId: number, done: boolean) => {
    updateTask(taskId, done)
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === Number(taskId) ? { ...task, done } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error('Błąd podczas aktualizacji zadania:', error));
  };

  const handleOpenDeleteDialog = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleCloseDeleteDialog = () => {
    setTaskToDelete(null);
  };

  return (
    <div>
      <h1>Lista zadań</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleOpenDeleteDialog}
        onToggleTask={handleToggleTask}
      />
      {taskToDelete && (
        <DeleteTask
          taskContent={taskToDelete.content}
          onDeleteConfirm={() => handleDeleteTask(taskToDelete.id)}
          onCancel={handleCloseDeleteDialog}
        />
      )}
    </div>
  );
};

export default App;