//task obj
export function createTask(title,priority,deadline){
    return{
        title,
        description:'',
        deadline,
        priority,
        isComplete:false,
        toggleComplete(){
            this.isComplete = !this.isComplete;
        },
        addDescription(note){
            this.description = note;
        }
    }
}
export function addSingleTask(task) {
    const swaparray = JSON.parse(localStorage.getItem('singletask')) || [];
    swaparray.push(task);
    localStorage.setItem('singletask', JSON.stringify(swaparray));
}
export function createProject(title, deadline) {
   return {
       title,
       deadline,
       tasks: [],
       isComplete: false,
       
       toggleComplete() {
           this.isComplete = !this.isComplete;
       },
       
       addTask(title, priority, deadline) {
           const task = createTask(title, priority, deadline);
           this.tasks.push(task);
           return task;
       },

       removeTask(taskTitle) {
           this.tasks = this.tasks.filter(task => task.title !== taskTitle);
       },
       
       getTaskByTitle(taskTitle) {
           return this.tasks.find(task => task.title === taskTitle);
       }
   }
}
export function logotext(logo, text) {
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

