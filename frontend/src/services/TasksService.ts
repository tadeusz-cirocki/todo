const API_URL = 'http://localhost:4000/tasks';

export const getAllTasks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error: any) {
    throw new Error('Failed to fetch tasks: ' + error.message);
  }
};

export const createTask = async (content: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error: any) {
    throw new Error('Failed to create task: ' + error.message);
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error: any) {
    throw new Error('Failed to delete task: ' + error.message);
  }
};

export const updateTask = async (taskId: number, done: boolean) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error: any) {
    throw new Error('Failed to update task: ' + error.message);
  }
};
