import { getTodos, getTodo, addTask, deleteItem } from './utils/crud.js';
import { LOADING_ICON_SVG } from './constants/icons.js';
import {
  DEFAULT_URL,
  LOCAL_API_URL,
  TYPECODE_DEMO_API_URL,
  GITHUB_API_URL,
} from './api/endpoints.js';

let API_URL = DEFAULT_URL;

const addTaskBtn = document.querySelector('.add-task-btn');
const todosContainer = document.querySelector('.todos');
const inputField = document.querySelector('.input-task');
const configApiContainer = document.querySelector('.config-api-container');

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  getTodos(`${API_URL}/todos`);
});

todosContainer.addEventListener('click', async (e) => {
  const btn = e.target.closest('.remove-btn');

  if (btn) {
    const id = btn.parentElement.dataset.id;
    const parentList = btn.closest('li.todo');
    const deleteButtonIcon = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = LOADING_ICON_SVG;
    btn.classList.add('loading-btn');

    try {
      await deleteItem(`${API_URL}/todos/${id}`);

      parentList.remove();

      if (todosContainer.children.length === 0) {
        todosContainer.innerHTML = `<li class="todo no-todo">
        <p>No tasks remaining, please add some tasks.</p></li>
       `;
        return;
      }
    } catch (error) {
      console.log('Error on Removing the task:', error);

      btn.disabled = false;
      btn.innerHTML = deleteButtonIcon;
      btn.classList.remove('loading-btn');
    }
  }
});

addTaskBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  if (!inputField.classList.contains('active')) {
    inputField.classList.add('active');
    setTimeout(() => {
      inputField.focus();
    }, 500);
  }

  if (inputField.value) {
    const newTask = {
      id: new Date().getTime(),
      todo: inputField.value,
    };

    const taskButtonContent = addTaskBtn.innerHTML;
    addTaskBtn.disabled = true;
    addTaskBtn.classList.add('loading-btn');
    addTaskBtn.innerHTML = LOADING_ICON_SVG;

    await addTask(`${API_URL}/todos`, newTask);
    await getTodos(`${API_URL}/todos`);

    addTaskBtn.innerHTML = taskButtonContent;
    addTaskBtn.disabled = false;
    addTaskBtn.classList.remove('loading-btn');
    inputField.value = '';
  }
});

// Configure Different json server API
configApiContainer.addEventListener('click', (e) => {
  if (e.target.closest('.api-setting-btn')) {
    configApiContainer.classList.toggle('is-open');
  }

  if (e.target.classList.contains('btn')) {
    const apiName = e.target.dataset.api;

    switch (apiName) {
      case 'local':
        API_URL = LOCAL_API_URL;
        break;
      case 'typecode-demo':
        API_URL = TYPECODE_DEMO_API_URL;
        break;
      case 'github-repo':
        API_URL = GITHUB_API_URL;
        break;

      default:
        break;
    }

    getTodos(`${API_URL}/todos`);
  }
});
