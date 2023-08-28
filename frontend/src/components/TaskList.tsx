import React from 'react';
import Task from '../interfaces/Task';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (task: Task) => void;
  onToggleTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleTask }) => {
  const completedTaskStyle = {
    textDecoration: 'line-through',
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={task.done ? completedTaskStyle : {}}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggleTask(task.id)}
          />
          {task.content}
          <button onClick={() => onDeleteTask(task)}>Usuń</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
