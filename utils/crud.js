// CRUD operation to JSON server
import { populateTodos } from './populateTodos.js';

export const getTodos = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    populateTodos(data);
  } catch (error) {
    console.log(error);
  }
};

// Get single todo from server
export const getTodo = async (id) => {
  try {
    const res = await fetch();
    const todo = await res.json();
    console.log(todo);
  } catch (error) {
    console.log(error);
  }
};

// Delete item from server
export const deleteItem = async (url) => {
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// Add new task

export const addTask = async (url, todo) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
