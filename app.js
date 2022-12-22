//Globals
const todoList = document.getElementById("todo-list");
const userSelect = document.getElementById("user-todo");
const form = document.querySelector("form");
let todos = [];
let users = [];
//attach event
document.addEventListener("DOMContentLoaded", initApp);
form.addEventListener("submit", handleSubmit);

//basic logic
function getUserNameById(userId) {
  const user = users.find((x) => x.id === userId);
  return user.name;
}
function printTodo(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = todo.id;
  li.innerHTML = `<span>${todo.title} <i>by</i> <b>${getUserNameById(
    todo.userId
  )}</b></span>`;

  const status = document.createElement("input");
  status.type = "checkbox";
  status.checked = todo.completed;
  status.addEventListener("change", handleTodoChanged);

  const close = document.createElement("span");
  close.innerHTML = "x";
  close.className = "close";
  close.addEventListener("click", handleClose);

  li.prepend(status);
  li.append(close);
  todoList.prepend(li);
}
function createUserOption(user) {
  const option = document.createElement("option");
  option.value = user.id;
  option.innerText = user.name;
  userSelect.prepend(option);
}
//event logic
function initApp() {
  Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
    [todos, users] = values;
    //отправить в разметку

    todos.forEach((todo) => printTodo(todo));
    users.forEach((user) => createUserOption(user));
  });
}

function handleSubmit(event) {
  event.preventDefault();
  createTodo({
    userId: Number(form.user.value),
    title: form.todo.value,
    completed: false,
  });
}
function handleTodoChanged() {
  //   const todoId = this.parentElement.dataset.id;
  const parentElement = this.parentElement;
  const dataset = parentElement.dataset;
  const id = dataset.id;
  const completed = this.checked;
  toggleTodoCompleted(id, completed);
}

function removeTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  const todo = todoList.querySelector(`[data-id="${todoId}"]`);
  todo.querySelector("input").removeEventListener("change", handleTodoChanged);
  todo.querySelector(".close").removeEventListener("click", handleClose);
  todo.remove();
}

function handleClose() {
  const parentElement = this.parentElement;
  const dataset = parentElement.dataset;
  const id = dataset.id;
  deleteTodo(id);
}
//async logic
async function getAllTodos() {
  const todosLink = "https://jsonplaceholder.typicode.com/todos";
  const todoResponse = await fetch(todosLink);
  const todoData = await todoResponse.json();
  return todoData;
}
async function getAllUsers() {
  const usersLink = "https://jsonplaceholder.typicode.com/users";
  const userResponse = await fetch(usersLink);
  const userData = await userResponse.json();
  return userData;
}

async function createTodo(todo) {
  const todoLink = "https://jsonplaceholder.typicode.com/todos";
  const todosResponse = await fetch(todoLink, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const todoJson = await todosResponse.json();
  printTodo(todoJson);
}

async function toggleTodoCompleted(todoId, completed) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ completed }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    //Error
  }
  const data = await response.json();
}

async function deleteTodo(todoId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    removeTodo(todoId);
  }
}
