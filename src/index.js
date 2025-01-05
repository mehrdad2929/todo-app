import createsidebar from "./sidebar";
import createSingleTaskTable from "./tables";
import "./styles/styles.css"
const div1 = createsidebar();
div1.className = "sidbar";
const div2 = createSingleTaskTable();
div2.className = "main-content";
document.body.appendChild(div1)
document.body.appendChild(div2)