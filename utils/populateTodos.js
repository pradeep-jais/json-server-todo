import { CROSS_ICON_SVG } from '../constants/icons.js';

const todosContainer = document.querySelector('.todos');

export function populateTodos(todos) {
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
