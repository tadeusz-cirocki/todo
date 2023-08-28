import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders the App component', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText('Lista zadań');
  expect(headerElement).toBeInTheDocument();
});

test('adds a task when "Dodaj" button is clicked', () => {
  const { getByPlaceholderText, getByText } = render(<App />);

  const taskName = 'New Task';
  addTask(getByPlaceholderText, getByText, taskName);

  const taskElement = getByText(taskName);
  const checkbox = getByText(taskName).querySelector('input[type="checkbox"]')!;

  expect(taskElement).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

test('deletes a task when "Usuń" then "Tak" button is clicked', () => {
  const { getByText, queryByText, getByPlaceholderText } = render(<App />);

  const taskName = 'New Task';
  addTask(getByPlaceholderText, getByText, taskName);

  const deleteButton = getByText('Usuń');
  fireEvent.click(deleteButton);
  const confirmButton = getByText('Tak');
  fireEvent.click(confirmButton);

  const taskElement = queryByText(taskName);
  expect(taskElement).toBeNull();
});

test('toggles task as done when checkbox is clicked', () => {
  const { getByPlaceholderText, getByText, getByLabelText } = render(<App />);

  const taskName = 'New Task';
  addTask(getByPlaceholderText, getByText, taskName);

  const taskElement = getByText(taskName);
  const checkbox = getByText(taskName).querySelector('input[type="checkbox"]')!;

  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

test('cancels task deletion when "Anuluj" button is clicked', () => {
  const { getByText, queryByText, getByPlaceholderText } = render(<App />);

  const taskName = 'New Task';
  addTask(getByPlaceholderText, getByText, taskName);

  const deleteButton = getByText('Usuń');
  fireEvent.click(deleteButton);

  const cancelButton = getByText('Anuluj', { selector: 'button' });
  fireEvent.click(cancelButton);

  const taskElement = queryByText('New Task');
  expect(taskElement).toBeInTheDocument();
});



// helper function
const addTask = (getByPlaceholderText: (text: string) => HTMLElement,
  getByText: (text: string) => HTMLElement, taskName: string) => {
  const input = getByPlaceholderText('Dodaj nowe zadanie...');
  const addButton = getByText('Dodaj');
  fireEvent.change(input, { target: { value: taskName } });
  fireEvent.click(addButton);
}