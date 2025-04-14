const LOCAL_API_URL = 'http://localhost:3000';
const GITHUB_API_URL =
  'https://my-json-server.typicode.com/pradeep-jais/json-server-api';
const TYPECODE_DEMO_API_URL = 'https://jsonplaceholder.typicode.com';
let API_URL =
  'https://my-json-server.typicode.com/pradeep-jais/json-server-api';

const LOADING_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"/></svg>`;

const CROSS_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;

const addTaskBtn = document.querySelector('.add-task-btn');
const todosContainer = document.querySelector('.todos');
const inputField = document.querySelector('.input-task');

const getTodos = async () => {
  try {
    const res = await fetch(`${API_URL}/todos`);
    const data = await res.json();
    console.log(data);

    populateTodos(data);
  } catch (error) {
    console.log(error);
  }
};

function populateTodos(todos) {
  if (todos.length === 0) {
    todosContainer.innerHTML = `<li class="todo">
      <p>No tasks remaining, please add some tasks.</p></li>
     `;
    return;
  }
  todosContainer.innerHTML = todos
    .map((item) => {
      const { id, todo, title } = item;
      return `<li class="todo" data-id=${id}>
      <p>${todo ? todo : title}</p>
      <button class='remove-btn'>${CROSS_ICON_SVG}</button></li>
     `;
    })
    .join('');
}

getTodos();

// Get single todo from server

const getTodo = async (id) => {
  try {
    const res = await fetch(`${API_URL}/todos/${id}`);
    const todo = await res.json();
    console.log(todo);
  } catch (error) {
    console.log(error);
  }
};

// getTodo(2);
// getTodo(1);
// getTodo(3);

// Delete item from server
const deleteItem = async (id) => {
  try {
    const res = await fetch(`${API_URL}/todos/${id}`, {
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
      await deleteItem(id);
      console.log();

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

// Add new task

const addTask = async (todo) => {
  try {
    const res = await fetch(`${API_URL}/todos`, {
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

    await addTask(newTask);
    await getTodos();

    addTaskBtn.innerHTML = taskButtonContent;
    addTaskBtn.disabled = false;
    addTaskBtn.classList.remove('loading-btn');
    inputField.value = '';
  }
});

// Configure Different json server API
const apiBtnContainer = document.querySelector('.btn-container');

apiBtnContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('btn')) return;

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

  getTodos();
  // console.log(apiName);
});

document.querySelector('.api-setting-btn').addEventListener('click', () => {
  document.querySelector('.config-api-container').classList.toggle('is-open');
});
