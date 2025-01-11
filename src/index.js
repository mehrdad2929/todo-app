import {logotext} from "./utils";
import tasksIcon from './images/tasks-done-svgrepo-com.svg'
import projectsIcon from './images/projects-svgrepo-com.svg'
import showProjectTable from "./tables";
import "./styles/styles.css"
const div1 = document.createElement('div');
const projects = logotext(projectsIcon,'projects');
const singleTasks = logotext(tasksIcon, 'single tasks');
div1.className = "sidbar";
div1.append(singleTasks);
div1.append(projects);
document.body.appendChild(div1)

singleTasks.addEventListener('click', () => {
    const existingTable = document.querySelector('.main-content');
    if (existingTable) {
        existingTable.remove();
    }
    const div2 = showProjectTable();
    div2.className = "main-content";
    document.body.appendChild(div2);
});