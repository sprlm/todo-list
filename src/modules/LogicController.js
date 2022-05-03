import Project from './Project';

export default class LogicController {
  projects = [];
  todoItems = [];

  addTodo = (todo) => {
    this.todoItems.push(todo);
    console.log(this.todoItems);
  }

  editTodo = (index, todo) => {
    this.todoItems[index] = todo;
    console.log(this.todoItems);
  }

  removeTodo = (index) => {
    this.todoItems.splice(index, 1);
    console.log(this.todoItems);
  }
}
