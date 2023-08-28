import React from 'react';

interface DeleteTaskProps {
  taskContent: string;
  onDeleteConfirm: () => void;
  onCancel: () => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ taskContent, onDeleteConfirm, onCancel }) => {
  return (
    <div>
      <p>Czy na pewno chcesz usunąć zadanie "{taskContent}"?</p>
      <button onClick={onDeleteConfirm}>Tak</button>
      <button onClick={onCancel}>Anuluj</button>
    </div>
  );
};

export default DeleteTask;
