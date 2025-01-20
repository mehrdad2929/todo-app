//task obj
const taskMethods = {
  toggleComplete() {
    this.isComplete = !this.isComplete;
  },
  addDescription(note) {
    this.description = note;
  },
};
export function createTask(title, priority, deadline) {
  //conside some type of encapsulation
  // only return the title and priority and deadline and description
  const task = Object.create(taskMethods);
  task.title = title;
  task.priority = priority;
  task.deadline = deadline;
  task.description = "";
  task.isComplete = false;
  return task;
}
//project obj
const projectMethods = {
  toggleComplete() {
    this.isComplete = !this.isComplete;
  },
  //change addtask so it gets object instead of 3 arg
  addTask(task) {
    this.tasks.push(task);
  },

  removeTask(taskTitle) {
    this.tasks = this.tasks.filter((task) => task.title !== taskTitle);
  },

  getTaskByTitle(taskTitle) {
    return this.tasks.find((task) => task.title === taskTitle);
  },
};
export function createProject(title, deadline) {
  const project = Object.create(projectMethods);
  project.title = title;
  project.deadline = deadline;
  project.tasks = [];
  return project;
}
export function hydrateProject(projectData) {
  return Object.assign(Object.create(projectMethods), projectData);
}
export function logotext(logo, text) {
  const elem = document.createElement("button");
  elem.className = "elem";

  const addtasklogo = document.createElement("img");
  addtasklogo.src = logo; // Changed from innerText to src since it's an image

  const addtasktext = document.createElement("div");
  addtasktext.innerText = text;

  elem.appendChild(addtasklogo);
  elem.appendChild(addtasktext);

  return elem;
}
