import "./reset.css";
import "./style.css";
import { Database, ToDo, Project, statusListProject, statusListToDo } from "./objects";
import { displayFullProject, displayAllToDos, displayAllProjects } from "./pages";
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
// newToDo.projectID = "P000001";

loadSampleData(newDB);
// displayFullProject(defaultProject);
// displayAllToDos(newDB);
displayAllProjects(newDB);



console.log(newDB.projectArray);
console.log(newDB.todoArray);
// displayFullProject(newDB.projectArray[0]);

document.addEventListener("click", (event) =>{
    if (event.target.classList.contains("button")){
        if(event.target.dataset.uid){
            // console.log(event.target);
            // const test = document.getElementById("view-projects");
            // console.log(test);
            // console.log(event.target.closest(".project"));
            console.log("click");
            const uID = event.target.dataset.uid;
            ///All project uniqueIDs begin with P, Todos begin with T
            let targetArray;
            let targetElement;
            if (uID.at(0)==="P") {
                targetArray = newDB.projectArray;
                targetElement = event.target.closest(".project");
            }
            else {
                targetArray = newDB.todoArray;
                targetElement = event.target.closest(".todo");
            }
            const filter = (element) => element.uniqueID == uID;
            const targetObject = targetArray.find(filter);
            
            if (event.target.classList.contains("delete-button")){
                const targetObjectIndex = targetArray.findIndex(filter);
                targetArray.splice(targetObjectIndex, 1);
                targetElement.remove();
                console.log(newDB.projectArray);
            }
            else if (event.target.classList.contains("edit-button")){

            }
            else if (event.target.classList.contains("complete-button")){

            }
        } 
        // switch(event.target.id){
        //     case 
        // }
    }
});





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
        // let project = database.projectArray[Math.floor(Math.random() * database.projectArray.length)].uniqueID;
        let project = database.projectArray[0].uniqueID;
        let todo = new ToDo(database, title, desc, status, due, priority, project);
        // database.todoArray.push(todo);
    }
}