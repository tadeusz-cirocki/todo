import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteTask from '../components/DeleteTask';

test('renders confirmation message with task content', () => {
  const taskContent = 'Task to delete';
  const { getByText } = render(
    <DeleteTask taskContent={taskContent} onDeleteConfirm={() => {}} onCancel={() => {}} />
  );

  const confirmationMessage = getByText(`Czy na pewno chcesz usunąć zadanie "${taskContent}"?`);
  expect(confirmationMessage).toBeInTheDocument();
});

test('calls onDeleteConfirm when "Tak" button is clicked', () => {
  const onDeleteConfirm = jest.fn();
  const onCancel = () => {}; // No need to spy onCancel

  const { getByText } = render(
    <DeleteTask taskContent="Task to delete" onDeleteConfirm={onDeleteConfirm} onCancel={onCancel} />
  );

  const confirmButton = getByText('Tak');
  fireEvent.click(confirmButton);

  expect(onDeleteConfirm).toHaveBeenCalled();
});

test('calls onCancel when "Anuluj" button is clicked', () => {
  const onDeleteConfirm = () => {}; // No need to spy onDeleteConfirm
  const onCancel = jest.fn();

  const { getByText } = render(
    <DeleteTask taskContent="Task to delete" onDeleteConfirm={onDeleteConfirm} onCancel={onCancel} />
  );

  const cancelButton = getByText('Anuluj');
  fireEvent.click(cancelButton);

  expect(onCancel).toHaveBeenCalled();
});
