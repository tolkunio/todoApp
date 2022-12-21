//Globals
const todoList = document.getElementById("todo-list");
const userSelect = document.getElementById("user-todo");
let todos = [];
let users = [];
//attach event
document.addEventListener("DOMContentLoaded", initApp);

//basic logic
function getUserNameById(userId) {
  console.log(userId);
  const user = users.find((x) => x.id === userId);
  return user;
}
function printTodo(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = todo.id;
  li.innerHTML = `<span>${todo.title} <i>by</i> <b>${getUserNameById(
    todo.userId
  )}</b></span>`;
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
