import React, { useState } from 'react';

interface AddTaskProps {
  onAddTask: (content: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [taskContent, setTaskContent] = useState('');

  const handleAddClick = () => {
    if (taskContent.trim() !== '') {
      onAddTask(taskContent);
      setTaskContent('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Dodaj nowe zadanie..."
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
      />
      <button onClick={handleAddClick}>Dodaj</button>
    </div>
  );
};

export default AddTask;
