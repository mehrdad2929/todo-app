import "/home/mehrdad/repos/todo-app/src/styles/tables.css";
import "./styles/dialoge.css";
import { createTask, hydrateProject, createProject } from "./utils";
import { el } from "date-fns/locale";
export function showSingleTasks() {
  const [table, tbody] = createTasksTable();
  // Create and append the plus button
  const addButton = document.createElement("button");
  addButton.textContent = "+";
  addButton.className = "add-button";
  const dialogElm = createDialogForm("singletask");
  addButton.addEventListener("click", () => dialogElm.showModal());
  tbody.appendChild(addButton);

  const swaparray = JSON.parse(localStorage.getItem("singletask")) || [];
  //write a loop to go throgh singletask list of obj and add new row
  swaparray.forEach((elem) => {
    const swapRow = createTaskRow(elem);

    tbody.appendChild(swapRow);
  });
  return table;
}

//todos:
// 1. main content table for every project (do this first)
// make it so it can be used for showing a single project containing tasks
export function showProject(project) {
  const projectContainer = document.createElement("div");
  //heading
  const headingContainer = document.createElement("div");
  const projectTitle = document.createElement("div");
  projectTitle.className = "projectTitle";
  projectTitle.innerText = project.title;
  const projectDeadline = document.createElement("div");
  projectDeadline.className = "projectDeadline";
  projectDeadline.innerText = project.deadline;
  headingContainer.appendChild(projectTitle);
  headingContainer.appendChild(projectDeadline);
  projectContainer.appendChild(headingContainer);
  const [table, tbody] = createTasksTable();
  // Create and append the plus button
  const addButton = document.createElement("button");
  addButton.textContent = "+";
  addButton.className = "add-button";

  const dialogElm = createDialogForm(project);
  addButton.addEventListener("click", () => dialogElm.showModal());
  tbody.appendChild(addButton);

  const projectsArray = JSON.parse(localStorage.getItem("projects")) || [];
  const projectFieldObj = projectsArray.find(
    (obj) => obj.title === project.title,
  );
  const projectTaskList = projectFieldObj.tasks;
  projectTaskList.forEach((task) => {
    const row = createTaskRow(task);
    tbody.appendChild(row);
  });
  //return the container
  projectContainer.appendChild(table);
  return projectContainer;
}

// 2. main content projects table

function createDialogForm(proj) {
  //dialog
  const dialog = document.createElement("dialog");
  dialog.id = "dialog";

  const form = document.createElement("form");
  form.className = "task-form";

  // Create container for all form elements
  const container = document.createElement("div");
  container.className = "form-container";
  // Task title input
  const titleDiv = document.createElement("div");
  titleDiv.className = "form-group";

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Task Title:";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.required = true;
  titleInput.className = "form-control";

  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);
  // Priority dropdown
  const priorityDiv = document.createElement("div");
  priorityDiv.className = "form-group";

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority:";

  const prioritySelect = document.createElement("select");
  prioritySelect.required = true;
  prioritySelect.className = "form-control";

  const priorities = ["high", "medium", "low"];
  priorities.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
    prioritySelect.appendChild(option);
  });

  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(prioritySelect);
  // Deadline input
  const deadlineDiv = document.createElement("div");
  deadlineDiv.className = "form-group";

  const deadlineLabel = document.createElement("label");
  deadlineLabel.textContent = "Deadline:";

  const deadlineInput = document.createElement("input");
  deadlineInput.type = "date";
  deadlineInput.required = true;
  deadlineInput.className = "form-control";

  deadlineDiv.appendChild(deadlineLabel);
  deadlineDiv.appendChild(deadlineInput);

  // Buttons container
  const buttonDiv = document.createElement("div");
  buttonDiv.className = "button-group";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";
  submitButton.className = "btn submit-btn";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.className = "btn cancel-btn";

  buttonDiv.appendChild(submitButton);
  buttonDiv.appendChild(cancelButton);

  // Add all elements to form
  container.appendChild(titleDiv);
  container.appendChild(priorityDiv);
  container.appendChild(deadlineDiv);
  container.appendChild(buttonDiv);
  form.appendChild(container);

  dialog.appendChild(form);

  form.addEventListener("submit", (e) => {
    //call showSingleTable  for refreshing table with for added task
    e.preventDefault();
    const formData = createTask(
      titleInput.value,
      prioritySelect.value,
      deadlineInput.value,
    );
    // saveing to local storage
    if (proj === "singletask") {
      const swaparray = JSON.parse(localStorage.getItem(proj)) || [];
      swaparray.push(formData);
      localStorage.setItem(proj, JSON.stringify(swaparray));

      dialog.close();
      const existingTable = document.querySelector(".main-content");
      if (existingTable) {
        existingTable.remove();
      }
      const div2 = showSingleTasks();
      div2.className = "main-content";
      document.body.appendChild(div2);
    }
    if (proj !== "singletask") {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const projObj = projects.find((obj) => obj.title === proj.title);
      const projIndex = projects.indexOf(projObj);
      //make task and other files in the project and task(in util.js private)
      //so its not meaningless using addtask(in other words why whould i use seter geter if data is not encapsulated)
      //(and is available easily ) use closure
      const projObjHyd = hydrateProject(projObj);
      projObjHyd.addTask(formData);
      projects[projIndex] = projObjHyd;
      localStorage.setItem("projects", JSON.stringify(projects));

      dialog.close();
      const existingTable = document.querySelector(".main-content");
      if (existingTable) {
        existingTable.remove();
      }
      const div2 = showProject(proj);
      div2.className = "main-content";
      document.body.appendChild(div2);
    }
  });

  cancelButton.addEventListener("click", () => {
    prioritySelect.value = "medium";
    titleInput.value = "";
    deadlineInput.value = "";
    dialog.close();
    showSingleTasks();
  });
  document.body.appendChild(dialog);
  return dialog;
}
function createTasksTable() {
  const maincontent = document.getElementsByClassName("main-content");
  maincontent.innerHTML = "";
  const table = document.createElement("table");

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  // Add header cells
  ["Title", "Description", "Deadline", "Priority", "Status"].forEach(
    (headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    },
  );

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  return [table, tbody];
}
function createTaskRow(taskObj) {
  const row = document.createElement("tr");

  // console.log(taskObj);
  Object.keys(taskObj).forEach((key) => {
    const td = document.createElement("td");
    if (key == "isComplete") {
      td.textContent = "incomplete";
      row.appendChild(td);
      return;
    }
    td.textContent = taskObj[key];
    row.appendChild(td);
  });
  return row;
}
