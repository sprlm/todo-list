export default class Project {
  constructor(title) {
    this.title = title;
    this.todoItems = [];
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get todoItems() {
    return this._todoItems;
  }

  set todoItems(value) {
    this._todoItems = value;
  }

  pushTodo = (todo) => {
    this.todoItems.push(todo);
  }

  editTodo = (index, todo) => {
    this.todoItems[index] = todo;
  }

  removeTodo = (index) => {
    this.todoItems.splice(index, 1);
  }
}
