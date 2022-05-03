import { loadProjects, saveProjects } from './Storage';
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
    saveProjects(this.projects);
  }

  editTodoInCurrentProject = (index, todo) => {
    this.projects[this.currentIndex].editTodo(index, todo);
    saveProjects(this.projects);
  }

  removeTodoInCurrentProject = (index) => {
    this.projects[this.currentIndex].removeTodo(index);
    saveProjects(this.projects);
  }

  pushProject = (project) => {
    this.projects.push(project);
    saveProjects(this.projects);
  }

  getProjects = () => {
    return this.projects;
  }

  removeProject = (index) => {
    this.projects.splice(index, 1);
    saveProjects(this.projects);
  }

  editCurrentIndex = (index) => {
    this.currentIndex = index;
  }

  getProjectTodoItems = () => {
    return this.projects[this.currentIndex].todoItems;
  }

  initializeProjects = () => {
    if (!loadProjects()) {
      this.projects = [new Project('Unsorted')];
    } else {
    this.projects = loadProjects();
    }
  }
}
