//Globals
let todos = [];
let users = [];
//attach event
document.addEventListener("DOMContentLoaded", initApp);
//event logic
function initApp() {
  Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
    [todos, users] = values;
    //console.log(todos, users);
    //отправить в разметку
  });
}
//async logic
async function getAllTodos() {
  const todosLink = "https://jsonplaceholder.typicode.com/todos";
  const todoResponse = await fetch(todosLink);
  const todoData = todoResponse.json();
  return todoData;
}
async function getAllUsers() {
  const usersLink = "https://jsonplaceholder.typicode.com/users";
  const userResponse = await fetch(usersLink);
  const userData = userResponse.json();
  return userData;
}
