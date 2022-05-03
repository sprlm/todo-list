import Todo from './Todo';

export default class LogicController {
  todoItems = [];

  addTodo = (todo) => {
    this.todoItems.push(todo);
  }

  removeTodoAt = (index) => {
    this.todoItems.splice(index, 1);
  }
}
