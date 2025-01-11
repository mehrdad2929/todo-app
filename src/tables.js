// Update your showProjectTable function
export default showSingleTask;
import "/home/mehrdad/repos/todo-app/src/styles/tables.css"
import "./styles/dialoge.css"
import { createTask,createProject } from "./utils";
import { el } from "date-fns/locale";
function showSingleTask() {
    // Create table element
    const maincontent = document.getElementsByClassName('main-content');
    maincontent.innerHTML = '';
    const table = document.createElement('table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Add header cells
    ['Title', 'Description', 'Deadline', 'Status'].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // Create and append the plus button
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.className = 'add-button';
    const dialogElm = creatDialogForm();
    addButton.addEventListener('click', () =>dialogElm.showModal());
    table.appendChild(addButton);

    
    const swaparray = JSON.parse(localStorage.getItem('singletask')) || [];
    //write a loop to go throgh singletask list of obj and add new row
    swaparray.forEach(elem=> {
       const swapRow = createTaskRow(elem);
        tbody.appendChild(swapRow);
    });
    // Initial task for example
    const initialRow = createTaskRow(createTask('coding','deadly','2025 jan 9'));
    tbody.appendChild(initialRow);
    return table;
}
function createTaskRow(taskObj) {
    const row = document.createElement('tr');
    Object.keys(taskObj).forEach(key => {
        const td = document.createElement('td');
        td.textContent = taskObj[key];
        row.appendChild(td);
    });
    return row;
}

// function addTask(tbody) {
//     const title = prompt('Enter task title:');
//     const priority = prompt('Enter task priority:');
//     const deadline = prompt('Enter task deadline:');
//     // saveing to local storage
//     const swaparray = JSON.parse(localStorage.getItem('singletask')) || [];
//     const swaptask =  createTask(title,priority,deadline);
//     swaparray.push(swaptask);
//     localStorage.setItem("singletask",JSON.stringify(swaparray));
    //open a modal then
    //create forum for getting data instead of prompt 
    // and add a submit key wich does 2 things 
    // 1 adds task to localstorage
    // 2 refreshes(calles showsingle task)table
   // const newRow = createTaskRow(swaptask);
    //tbody.appendChild(newRow);
// }
function creatDialogForm() {
    //dialog
    const dialog = document.createElement('dialog');
    dialog.id = 'dialog';
 
    const form = document.createElement('form');
    form.className = 'task-form';
    
    // Create container for all form elements
    const container = document.createElement('div');
    container.className = 'form-container';
    // Task title input
    const titleDiv = document.createElement('div');
    titleDiv.className = 'form-group';
    
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Task Title:';
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.required = true;
    titleInput.className = 'form-control';
    
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
    // Priority dropdown
    const priorityDiv = document.createElement('div');
    priorityDiv.className = 'form-group';
    
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority:';
    
    const prioritySelect = document.createElement('select');
    prioritySelect.required = true;
    prioritySelect.className = 'form-control';
    
    const priorities = ['high', 'medium', 'low'];
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
        prioritySelect.appendChild(option);
    });
    
    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(prioritySelect);
   // Deadline input
    const deadlineDiv = document.createElement('div');
    deadlineDiv.className = 'form-group';
    
    const deadlineLabel = document.createElement('label');
    deadlineLabel.textContent = 'Deadline:';
    
    const deadlineInput = document.createElement('input');
    deadlineInput.type = 'date';
    deadlineInput.required = true;
    deadlineInput.className = 'form-control';
    
    deadlineDiv.appendChild(deadlineLabel);
    deadlineDiv.appendChild(deadlineInput);
    
    // Buttons container
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'button-group';
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.className = 'btn submit-btn';
    
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.className = 'btn cancel-btn';
    
    buttonDiv.appendChild(submitButton);
    buttonDiv.appendChild(cancelButton);
    
    // Add all elements to form
    container.appendChild(titleDiv);
    container.appendChild(priorityDiv);
    container.appendChild(deadlineDiv);
    container.appendChild(buttonDiv);
    form.appendChild(container);
    
    // Add form to document body or any other container
    dialog.appendChild(form);
    
    // Add event listeners
    // if u want u can rewrite evantlisteners for submit but instead of using form(but i think its ok this way too)
    // move event listeners ti index.js here we create dom(kind of the html)
    form.addEventListener('submit', (e) => {
        //call showSingleTable  for refreshing table with for added task
        e.preventDefault();
        const formData = createTask(titleInput.value,prioritySelect.value,deadlineInput.value);
        // saveing to local storage
        const swaparray = JSON.parse(localStorage.getItem('singletask')) || [];
        swaparray.push(formData);
        localStorage.setItem("singletask",JSON.stringify(swaparray));
        
        dialog.close();
        showSingleTask();
        console.log('Form submitted:', formData);
    });
    

    cancelButton.addEventListener('click', () => {
        prioritySelect.value = 'medium';
        titleInput.value = '';
        deadlineInput.value = '';
        dialog.close();
        showSingleTask();
    });
    document.body.appendChild(dialog);
    return dialog;
} 