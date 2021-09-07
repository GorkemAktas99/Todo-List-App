const newTodo = document.querySelector('.input-todo');
const newTodoAddBtn = document.querySelector('.btn-todo-add');
const todoList = document.querySelector('.todo-list');

newTodoAddBtn.addEventListener('click',todoAdd);
todoList.addEventListener('click',todoRemoveDone);
document.addEventListener('DOMContentLoaded',localStorageRead);


function todoRemoveDone(e){
  const selectedElement = e.target;

  if(selectedElement.classList.contains('todo-btn-done')){
    selectedElement.parentElement.classList.toggle('todo-done');
  }
  if(selectedElement.classList.contains('todo-btn-remove')){
    selectedElement.parentElement.classList.toggle('disappear');
    const removingTodo = selectedElement.parentElement.children[0].innerText;

    localStorageSil(removingTodo);

    selectedElement.parentElement.addEventListener('transitionend',function(){
      selectedElement.parentElement.remove();
    });
  }
}

function todoAdd(e){
  e.preventDefault();
  todoItemCreate(newTodo.value);
  localStorageSave(newTodo.value);
  newTodo.value = '';
}

function localStorageSave(newTodo){
  let todos;

  if(localStorage.getItem('todos')===null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function localStorageRead(){
  let todos;

  if(localStorage.getItem('todos')===null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo){
    todoItemCreate(todo);
  });
}

function todoItemCreate(todo){
  //div creating
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo-item');

  //li creating
  const todoLi = document.createElement('li');
  todoLi.classList.add('todo-define');
  todoLi.innerText = todo;
  todoDiv.appendChild(todoLi);

  //done button adding
  const todoDoneBtn = document.createElement('button');
  todoDoneBtn.classList.add('todo-btn');
  todoDoneBtn.classList.add('todo-btn-done');
  todoDoneBtn.innerHTML = '<i class="fas fa-clipboard-check"></i>';
  todoDiv.appendChild(todoDoneBtn);

  //delete button adding
  const todoRemoveBtn = document.createElement('button');
  todoRemoveBtn.classList.add('todo-btn');
  todoRemoveBtn.classList.add('todo-btn-remove');
  todoRemoveBtn.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(todoRemoveBtn);

  //adding created div to ul
  todoList.appendChild(todoDiv);
}

function localStorageSil(todo){
  let todos;

  if(localStorage.getItem('todos')===null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  //Item deleting withh splice
  const removeElementIndex = todos.indexOf(todo);
  todos.splice(removeElementIndex,1);

  localStorage.setItem('todos',JSON.stringify(todos));
}
