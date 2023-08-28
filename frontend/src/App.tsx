import React, { useState } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import DeleteTask from './components/DeleteTask';
import Task from './interfaces/Task';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleAddTask = (content: string) => {
    const newTask: Task = { id: Date.now(), content, done: false };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setTaskToDelete(null);
  };

  const handleToggleTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
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
