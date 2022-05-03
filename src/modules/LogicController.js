import Project from './Project';

export default class LogicController {
  projects = [];
  currentIndex = 0;

  constructor() {
    const unsorted = new Project('Unsorted');

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

  pushProject = (project) => {
    this.projects.push(project);
    console.log(this.projects);
  }

  removeProject = (index) => {
    this.projects.splice(index, 1);
    console.log(index);
    console.log(this.projects);
  }

  editCurrentIndex = (index) => {
    this.currentIndex = index;
  }

  getProjectTodoItems = () => {
    return this.projects[this.currentIndex].todoItems;
  }
}
