export default class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  get title() {
    return this._title;
  }



  set title(value) {
    this._title = value;
  }
}
