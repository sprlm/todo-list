import { format, parse } from 'date-fns';
import LogicController from './LogicController';
import Project from './Project';
import Todo from './Todo';

const logic = new LogicController();
const todoList = document.querySelector('.todo-list');

const getElementIndex = (node) => {
  let index = 0;
  while (node = node.previousElementSibling) {
    index++;
  }
  return index;
};

const addTodoToDOM = (todo) => {
  const todoItem = document.createElement('div');
  todoItem.classList.add('todo-item');
  if (todo.priority === 'high') todoItem.classList.add('important');

  const title = document.createElement('h3');
  title.classList.add('todo-item-title')
  title.textContent = todo.title;
  todoItem.appendChild(title);

  const dueDate = document.createElement('div');
  dueDate.classList.add('todo-item-date');
  dueDate.textContent = todo.dueDate;
  todoItem.appendChild(dueDate);

  const description = document.createElement('div');
  description.classList.add('todo-item-description', 'hidden');
  description.textContent = todo.description;
  todoItem.appendChild(description);

  const buttonRow = document.createElement('div');
  buttonRow.classList.add('btn-row', 'hidden');

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.classList.add('btn', 'btn-solid');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', (e) => {
    const itemToEdit = e.currentTarget.parentElement.parentElement;
    addTodoFormToDOM(true, getElementIndex(itemToEdit));
  });
  buttonRow.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('btn', 'btn-outlined');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', (e) => {
    const itemToDelete = e.currentTarget.parentElement.parentElement;
    logic.removeTodoInCurrentProject(getElementIndex(itemToDelete));
    todoList.removeChild(itemToDelete);
  });
  buttonRow.appendChild(deleteButton);

  todoItem.appendChild(buttonRow);

  todoItem.addEventListener('click', (e) => {
    e.currentTarget.childNodes[2].classList.toggle('hidden');
    e.currentTarget.childNodes[3].classList.toggle('hidden');
  });

  todoList.appendChild(todoItem);
};

const editTodoInDOM = (index, todo) => {
  const todoItem = todoList.children[index];

  (todo.priority === 'high') ? 
    todoItem.classList.add('important') : todoItem.classList.remove('important');
  
  todoItem.children[0].textContent = todo.title;
  todoItem.children[1].textContent = todo.dueDate;
  todoItem.children[2].textContent = todo.description;
};

const addTodoFormToDOM = (isEdit, editIndex) => {
  const formWrapper = document.createElement('div');
  formWrapper.classList.add('form-wrapper');

  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');

  const todoForm = document.createElement('form');
  todoForm.classList.add('todo-form');
  
  const formHeader = document.createElement('div');
  formHeader.classList.add('form-header');
  
  const headerText = document.createElement('h1');
  headerText.textContent = 'Todo Details';
  formHeader.appendChild(headerText);

  const closeButton = document.createElement('img');
  closeButton.src = './assets/close.svg';
  closeButton.classList.add('close-btn');
  closeButton.addEventListener('click', removeTodoFormFromDOM);
  formHeader.appendChild(closeButton);

  todoForm.appendChild(formHeader);

  const titleDiv = document.createElement('div');

  const titleLabel = document.createElement('label');
  titleLabel.for = 'title';
  titleLabel.classList.add('form-label');
  titleLabel.textContent = 'Title';
  titleDiv.appendChild(titleLabel);

  const titleInput = document.createElement('input');
  titleInput.setAttribute('required', '');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.id = 'title';
  titleInput.classList.add('title-input');
  titleDiv.appendChild(titleInput);

  todoForm.appendChild(titleDiv);

  const descriptionDiv = document.createElement('div');

  const descriptionLabel = document.createElement('label');
  descriptionLabel.for = 'description';
  descriptionLabel.classList.add('form-label');
  descriptionLabel.textContent = 'Description';
  descriptionDiv.appendChild(descriptionLabel);

  const descriptionInput = document.createElement('textarea');
  descriptionInput.setAttribute('required', '');
  descriptionInput.name = 'description';
  descriptionInput.id = 'description';
  descriptionInput.rows = '5';
  descriptionDiv.appendChild(descriptionInput);

  todoForm.appendChild(descriptionDiv);

  const formRow = document.createElement('div');
  formRow.classList.add('form-row');

  const dueDateDiv = document.createElement('div');

  const dueDateLabel = document.createElement('label');
  dueDateLabel.for = 'due-date';
  dueDateLabel.classList.add('form-label');
  dueDateLabel.textContent = 'Due Date';
  dueDateDiv.appendChild(dueDateLabel);

  const dueDateInput = document.createElement('input');
  dueDateInput.setAttribute('required', '');
  dueDateInput.setAttribute('min', new Date().toISOString().slice(0,10));
  dueDateInput.type = 'date';
  dueDateInput.name = 'due-date';
  dueDateInput.id = 'due-date';
  dueDateDiv.appendChild(dueDateInput);

  formRow.appendChild(dueDateDiv);

  const priorityDiv = document.createElement('div');

  const priorityLabel = document.createElement('label');
  priorityLabel.for = 'priority';
  priorityLabel.classList.add('form-label');
  priorityLabel.textContent = 'Priority';
  priorityDiv.appendChild(priorityLabel);

  const prioritySelect = document.createElement('select');
  prioritySelect.setAttribute('required', '');
  prioritySelect.name = 'priority';
  prioritySelect.id = 'priority';

  const normalOption = document.createElement('option');
  normalOption.value = 'normal';
  normalOption.textContent = 'Normal';
  prioritySelect.appendChild(normalOption);

  const highOption = document.createElement('option');
  highOption.value = 'high';
  highOption.textContent = 'High';
  prioritySelect.appendChild(highOption);

  priorityDiv.appendChild(prioritySelect);

  formRow.appendChild(priorityDiv);

  todoForm.appendChild(formRow);

  const todoFormBtn = document.createElement('button');
  todoFormBtn.type = 'button';
  todoFormBtn.classList.add('btn', 'btn-solid');
  todoFormBtn.id = 'todo-form-btn';
  todoFormBtn.textContent = 'Submit';
  todoFormBtn.addEventListener('click', (e) => {
    if (todoForm.checkValidity() == false) {
      todoForm.reportValidity();
    } else {
      const title = todoForm.elements[0].value;
      const description = todoForm.elements[1].value;
      const dueDate = format(
        parse(todoForm.elements[2].value, 'yyyy-MM-dd', new Date()),
        'MM/dd/yyyy'
        );
      const priority = todoForm.elements[3].value;

      const todo = new Todo(title, description, dueDate, priority);

      if (isEdit) {
        editTodoInDOM(editIndex, todo);
        logic.editTodoInCurrentProject(editIndex, todo);
      } else {
        addTodoToDOM(todo);
        logic.pushTodoToCurrentProject(todo);
      }

      removeTodoFormFromDOM();
    }
  });
  
  todoForm.appendChild(todoFormBtn);

  formContainer.appendChild(todoForm);

  formWrapper.appendChild(formContainer);

  document.body.appendChild(formWrapper);
};

const removeTodoFormFromDOM = () => {
  const formWrapper = document.querySelector('.form-wrapper');
  document.body.removeChild(formWrapper);
};

const initializeDOM = () => {
  const addTodoBtn = document.querySelector('#add-todo-btn');
  addTodoBtn.addEventListener('click', () => addTodoFormToDOM(false));

  const test1 = new Todo('title1','description','1/1/2022','normal');
  const test2 = new Todo('title2','description','1/1/2022','high');
  const test3 = new Todo('title3','description','1/1/2022','normal');
  addTodoToDOM(test1);
  addTodoToDOM(test2);
  addTodoToDOM(test3);
  logic.pushTodoToCurrentProject(test1);
  logic.pushTodoToCurrentProject(test2);
  logic.pushTodoToCurrentProject(test3);
};

export default initializeDOM;

