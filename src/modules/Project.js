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
}
