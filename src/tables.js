export default createSingleTaskTable;
import "/home/mehrdad/repos/todo-app/src/styles/tables.css"
//for tasks related to a project i will use single task table to 
// the other tables wich come to mind are 1. a whole veiw of projects
function createSingleTaskTable() {
    // Create table element
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
    
    // Example data row
    const row = document.createElement('tr');
    ['Do homework', 'Math problems', '2025/1/10', 'Incomplete'].forEach(cellText => {
        const td = document.createElement('td');
        td.textContent = cellText;
        row.appendChild(td);
    });
    
    tbody.appendChild(row);
    table.appendChild(tbody);

    return table;
}

