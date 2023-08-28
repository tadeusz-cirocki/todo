import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddTask from '../components/AddTask';

test('calls onAddTask with task content when "Dodaj" button is clicked', () => {
  const onAddTask = jest.fn();
  const { getByPlaceholderText, getByText } = render(<AddTask onAddTask={onAddTask} />);

  const input = getByPlaceholderText('Dodaj nowe zadanie...');
  const addButton = getByText('Dodaj');

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  expect(onAddTask).toHaveBeenCalledWith('New Task');
});

test('does not call onAddTask when "Dodaj" button is clicked with empty input', () => {
  const onAddTask = jest.fn();
  const { getByText } = render(<AddTask onAddTask={onAddTask} />);

  const addButton = getByText('Dodaj');

  fireEvent.click(addButton);

  expect(onAddTask).not.toHaveBeenCalled();
});

test('clears input field after adding a task', () => {
  const onAddTask = jest.fn();
  const { getByPlaceholderText, getByText } = render(<AddTask onAddTask={onAddTask} />);

  const input = getByPlaceholderText('Dodaj nowe zadanie...');
  const addButton = getByText('Dodaj');

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  expect(input).toHaveValue('');
});
