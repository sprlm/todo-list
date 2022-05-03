import Project from "./Project";

const storageAvailable = (type) => {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
};

if (storageAvailable('localStorage')) {
  if (localStorage.getItem('projects')) {
    
  }
}

const loadProjects = () => {
  if (storageAvailable('localStorage')) {
    if (localStorage.getItem('projects')) {
      const projects = JSON.parse(localStorage.getItem('projects'));

      projects.forEach(element => {
        element.title = element._title;
        element.todoItems = element._todoItems;
        element.todoItems.forEach(todo => {
          todo.title = todo._title;
          todo.description = todo._description;
          todo.dueDate = todo._dueDate;
          todo.priority = todo._priority;
        });

        element.pushTodo = function (todo) {
          this.todoItems.push(todo);
        };

        element.editTodo = function (index, todo) {
          this.todoItems[index] = todo;
        };

        element.removeTodo = function (index) {
          this.todoItems.splice(index, 1);
        };
      });

      return projects;
    }
  }
}

const saveProjects = (projects) => {
  if (storageAvailable('localStorage')) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

export { loadProjects, saveProjects };
