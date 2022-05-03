import Project from './Project';

export default class LogicController {
  projects = [];
  currentIndex = 0;

  constructor() {
    const unsorted = new Project('unsorted');

    this.projects = [unsorted];
    this.currentIndex = 0;
  }

  pushTodoToCurrentProject = (todo) => {
    this.projects[this.currentIndex].pushTodo(todo);
  }

  editTodoInCurrentProject = (index, todo) => {
    this.projects[this.currentIndex].editTodo(index, todo);
  }

  removeTodoInCurrentProject = (index) => {
    this.projects[this.currentIndex].removeTodo(index);
  }
}
