export default createsidebar;
import '/home/mehrdad/repos/todo-app/src/styles/sidebar.css'
import tasksIcon from './images/tasks-done-svgrepo-com.svg'
import projectsIcon from './images/projects-svgrepo-com.svg'
function createsidebar(){
    const container = document.createElement('div'); 
    container.className = "container";
    const singleTasks = logotext(tasksIcon, 'single tasks');
    const projects = logotext(projectsIcon,'projects');
    container.appendChild(singleTasks);
    container.appendChild(projects);
    //adding event listener to single tasks and then projects
    singleTasks.addEventListener('click',()=>{
        alert('hello')
    });
    return container;
}


function logotext(logo, text) {
    const elem = document.createElement('button');
    elem.className = "elem";
    
    const addtasklogo = document.createElement('img');
    addtasklogo.src = logo; // Changed from innerText to src since it's an image
    
    const addtasktext = document.createElement('div');
    addtasktext.innerText = text;
    
    elem.appendChild(addtasklogo);
    elem.appendChild(addtasktext);
    
    return elem;
}
function showProjectTable(){
    const table = document.createElement('table'); 

}
//single task events and making changes into tables from here
