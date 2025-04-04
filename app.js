// Promise using then and catch
// fetch(' http://localhost:3000/todos')
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//     todos = data;
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Getting data(todos) from local json server

const todosContainer = document.querySelector('.todos');

const getTodos = async () => {
  try {
    const res = await fetch('http://localhost:3000/todos');
    const data = await res.json();
    populateTodos(data);
  } catch (error) {
    console.log(error);
  }
};

function populateTodos(todos) {
  todosContainer.innerHTML = todos
    .map((item) => {
      const { id, todo } = item;
      return `<li class="todo" data-id=${id}><span>${todo}</span><button class='remove-btn'>❌</button></li>`;
    })
    .join('');
}

getTodos();

// Get single todo from server

const getTodo = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/todos/${id}`);
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
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

todosContainer.addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.classList.contains('remove-btn')) {
    const id = btn.parentElement.dataset.id;
    deleteItem(id);
  }
});
