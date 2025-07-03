import "./reset.css";
import "./style.css";
import { Database, ToDo, Project, statusListProject, statusListToDo } from "./objects";
import { displayFullProject } from "./pages";
import { format, addDays } from "date-fns";


// Initialize Page
const newDB = new Database("test", "orange");
const defaultProject = new Project(newDB, "Unassigned", "Default Project for all unassigned ToDos","N/A");
const testProject = new Project(newDB, "test");


//test
const newToDo = new ToDo(newDB, "test", "test desc", "new", "date", "low", "P000000");
// defaultProject.todoArray.push(newToDo);
newToDo.title = "Redo";
// newDB.todoArray.push(newToDo);
newToDo.title = "Rerunnn";
newToDo.projectID = "P000001";



// loadSampleData(newDB);
console.log(newDB.projectArray);
console.log(newDB.todoArray);
// displayFullProject(newDB.projectArray[0]);







function loadSampleData(database){

    for(let i = 1; i < 9; i++){
        let pTitle = "Project " + i;
        let desc = "Generic description"
        let status = statusListProject[Math.floor(Math.random() * statusListProject.length)];
        let project = new Project(database, pTitle, desc, status)
        // database.projectArray.push(project);
    }

    for(let i=1; i < 20; i++){
        let title = "ToDo " + i;
        let desc = "Generic description";
        let status = statusListToDo[Math.floor(Math.random() * statusListToDo.length)];
        let due = addDays(new Date(), Math.floor(Math.random() * 60));
        due = format(due, "MM/dd/yyyy");
        const priorityValues = ["high", "low"];
        let priority = priorityValues[Math.floor(Math.random() * 2)];
        let project = database.projectArray[Math.floor(Math.random() * database.projectArray.length)].uniqueID;
        let todo = new ToDo(database, title, desc, status, due, priority, project);
        // database.todoArray.push(todo);
    }
}