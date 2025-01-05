//task obj
function createTask(title,priority,deadline){
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
function addSingleTask(task) {
    const swaparray = JSON.parse(localStorage.getItem('singletask')) || [];
    swaparray.push(task);
    localStorage.setItem('singletask', JSON.stringify(swaparray));
}
function createProject(title, deadline) {
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
