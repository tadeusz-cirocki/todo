import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';

const tasks = [
  { id: 1, content: 'Task 1', done: false },
  { id: 2, content: 'Task 2', done: true },
];

test('renders a list of tasks', () => {
  const { getByText } = render(<TaskList tasks={tasks} onDeleteTask={() => {}} onToggleTask={() => {}} />);
  
  const task1 = getByText('Task 1');
  const task2 = getByText('Task 2');
  
  expect(task1).toBeInTheDocument();
  expect(task2).toBeInTheDocument();
});

test('calls onDeleteTask when "Usuń" button is clicked', () => {
  const onDeleteTask = jest.fn();
  const { getAllByText } = render(<TaskList tasks={tasks} onDeleteTask={onDeleteTask} onToggleTask={() => {}} />);
  
  const deleteButton = getAllByText('Usuń');
  fireEvent.click(deleteButton[0]);
  
  expect(onDeleteTask).toHaveBeenCalledWith(tasks[0]);
});

test('calls onToggleTask when checkbox is clicked', () => {
  const onToggleTask = jest.fn();
  const { getByText } = render(<TaskList tasks={tasks} onDeleteTask={() => {}} onToggleTask={onToggleTask} />);
  
  const checkbox = getByText('Task 1').querySelector('input[type="checkbox"]')!;
  fireEvent.click(checkbox);
  
  expect(onToggleTask).toHaveBeenCalledWith(tasks[0].id);
});
