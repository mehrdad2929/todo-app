import tasksIcon from './images/tasks-done-svgrepo-com.svg'
import projectsIcon from './images/projects-svgrepo-com.svg'
import { logotext,createProject} from "./utils"; 
import { showProject, showSingleTasks } from './main-content';
import './styles/sidebar.css'
export function createSidebar(){
    document.body.innerHTML = '';
    const sidebarContainer = document.createElement('div');
    sidebarContainer.id = 'sidebar-container';
    //create sidebar project table
    //showing list of projects
    const projectsListElm = document.createElement('ul');
    const projectList = JSON.parse(localStorage.getItem('projects')) || [];
    projectList.forEach(elem => {
        const listElem = document.createElement('li');
        const prbtn = document.createElement('button');
        prbtn.className = 'projectbtn';
        prbtn.innerText = elem.title;
        //add event listener to open elem project in main-content  
        prbtn.addEventListener('click',()=>{
            const existingTable = document.querySelector('.main-content');
            if (existingTable) {
                existingTable.remove();
            }
            const div2 = showProject(elem);
            div2.className = "main-content";
            document.body.appendChild(div2);
        });
        listElem.appendChild(prbtn);
        projectsListElm.appendChild(listElem);
    });
    //add a plus btn or somthing to add new project
    const addProjectBtn = document.createElement('button');
    addProjectBtn.textContent = '+';
    addProjectBtn.className = 'add-project-button';
    const addProjectDialogElm = sidebarProjectsDialoge();
    addProjectBtn.addEventListener('click', () =>addProjectDialogElm.showModal());
    projectsListElm.appendChild(addProjectBtn);
 
    const sidebarProjectContainer = document.createElement('div');
    const projects = logotext(projectsIcon,'projects');
    sidebarProjectContainer.appendChild(projects);
    sidebarProjectContainer.appendChild(projectsListElm);
    const singleTasks = logotext(tasksIcon, 'single-tasks');
    sidebarContainer.append(singleTasks);
    sidebarContainer.append(sidebarProjectContainer); 
    // adding sidebar to body and its interactions when pressing singletasks or projects
    document.body.appendChild(sidebarContainer);
    //single tasks
    singleTasks.addEventListener('click', () => {
        const existingTable = document.querySelector('.main-content');
        if (existingTable) {
            existingTable.remove();
        }
        const div2 = showSingleTasks();
        div2.className = "main-content";
        document.body.appendChild(div2);
    });
    // if needed for a full veiw of all of the projects(create a showallprojects function in main-cntent.js and use it here)
    // projects
    // adding eventlistener

    
}
function sidebarProjectsDialoge() {
    //dialog
    const dialog = document.createElement('dialog');
    dialog.id = 'dialog';
 
    const form = document.createElement('form');
    form.className = 'task-form';
    
    // Create container for all form elements
    const container = document.createElement('div');
    container.className = 'form-container';
    // Project title input
    const titleDiv = document.createElement('div');
    titleDiv.className = 'form-group';
    
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Project Title:';
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.required = true;
    titleInput.className = 'form-control';
    
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
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
    container.appendChild(deadlineDiv);
    container.appendChild(buttonDiv);
    form.appendChild(container);
    
    // Add form to document body or any other container
    dialog.appendChild(form);

    form.addEventListener('submit', (e) => {
        //call showSingleTable  for refreshing table with for added task
        e.preventDefault();
        const formData = createProject(titleInput.value,deadlineInput.value);
        // saveing to local storage
        const swaparray = JSON.parse(localStorage.getItem('projects')) || [];
        swaparray.push(formData);
        localStorage.setItem("projects",JSON.stringify(swaparray));
        
        dialog.close();
        // some how this dosent refresh the table with 
        // solution
        createSidebar();
    });
    

    cancelButton.addEventListener('click', () => {
        titleInput.value = '';
        deadlineInput.value = '';
        dialog.close();
        showSingleTasks();
    });
    document.body.appendChild(dialog);
    return dialog;
} 

