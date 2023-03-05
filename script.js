const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;

loadItems();

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addNewItem);
  taskList.addEventListener("click", deleteItem);
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  todos = getItemsFromLS();
  todos.forEach(function (item) {
    createItem(item);
  });
}

function getItemsFromLS() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function setItemToLS(newTodo){
  todos = getItemsFromLS();
  todos.push(newTodo);
  localStorage.setItem("todos",JSON.stringify(todos));
}

function createItem(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(newTodo));

  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  li.appendChild(a);
  taskList.append(li);
}

function addNewItem(e) {
  if (input.value === "") {
    alert("add new item");
    //console.log("submit");
  }

  createItem(input.value);

  setItemToLS(input.value);

  input.value = "";
  e.preventDefault();
}


function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("Are you sure you want to delete?")) {
      // console.log(e.target)
      e.target.parentElement.parentElement.remove();
      deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }
  }


}

function deleteTodoFromStorage(deleteTodo){
  let todos = getItemsFromLS();

  todos.forEach(function(todo,index){

    if(todo === deleteTodo){
      todos.splice(index,1);
    }
  });
  localStorage.setItem("todos",JSON.stringify(todos));

}


function deleteAllItems(e) {
  if (confirm("Are you sure you want to delete all?")) {
   
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
}
