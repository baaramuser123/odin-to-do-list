import "./reset.css";
import "./style.css";
import { Database, ToDo, Project, statusListProject, statusListToDo, priorityList } from "./objects";
import { displayFullProject, displayAllToDos, displayAllProjects } from "./pages";
import { format, addDays } from "date-fns";


// Initialize Page
const newDB = new Database("test", "orange");
const defaultProject = new Project(newDB, "Unassigned", "Default Project for all unassigned ToDos","N/A");


//test
const newToDo = new ToDo(newDB, "test", "test desc", "new", "date", "low", "P000000");


let lastDisplayFunction = displayAllToDos;
let lastDisplayArg = newDB;
lastDisplayFunction(lastDisplayArg);



console.log(newDB.projectArray);
console.log(newDB.todoArray);
// displayFullProject(newDB.projectArray[0]);
let formInput = [];

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
            let targetStatusList;
            let targetObjectType;
            if (uID.at(0)==="P") {
                targetArray = newDB.projectArray;
                targetElement = event.target.closest(".project");
                targetStatusList = statusListProject;
                targetObjectType = "project";
            }
            else {
                targetArray = newDB.todoArray;
                targetElement = event.target.closest(".todo");
                targetStatusList = statusListToDo;
                targetObjectType = "todo";
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
                //experimental
                formInput = [];
                formInput.push(targetObject);
                //experimental
                const modal = document.getElementById(targetObjectType + "-edit");
                const form = document.getElementById(targetObjectType + "-form");
                form.textContent = "";
                for(let key in targetObject){
                    if(key == "uniqueID" || key == "todoArray" || key == "database") continue;
                    const label = document.createElement("label");
                    label.setAttribute("for", `edit-${targetObjectType}-${key}`);
                    label.textContent = key.toUpperCase() + ": ";
                    form.appendChild(label);
                    if(key == "status"){
                        const select = document.createElement("select");
                        select.setAttribute("name", key);
                        select.id = `edit-${targetObjectType}-${key}`;
                        for(let stat in targetStatusList){
                            const option = document.createElement("option");
                            option.setAttribute("value", targetStatusList[stat]);
                            option.textContent = targetStatusList[stat].toUpperCase();
                            select.appendChild(option);
                            select.value = targetObject[key];
                            form.appendChild(select);
                        }
                        //experimental
                        formInput.push(select);
                        //experimental
                    }
                    else if (key == "priority"){
                        const select = document.createElement("select");
                        select.setAttribute("name", key);
                        select.id = `edit-${targetObjectType}-${key}`;
                        for(let val in priorityList){
                            const option = document.createElement("option");
                            option.setAttribute("value", priorityList[val]);
                            option.textContent = priorityList[val].toUpperCase();
                            select.appendChild(option);
                            select.value = targetObject[key];
                            form.appendChild(select);
                        }
                        //experimental
                        formInput.push(select);
                        //experimental
                    }
                    else{
                        const input = document.createElement("input");
                        input.setAttribute("type", "text");
                        input.setAttribute("name", key);
                        input.id = `edit-${targetObjectType}-${key}`;
                        input.defaultValue = targetObject[key];
                        //experimental
                        formInput.push(input);
                        //experimental
                        form.appendChild(input);
                    }
                }
                const saveButton = document.createElement("button");
                const cancelButton = document.createElement("button");
                saveButton.textContent = "Save";
                cancelButton.textContent = "Cancel";
                form.append(cancelButton, saveButton);
                //pop up modal to make changes
                modal.showModal();
                //rerun display function after making changes
            }
            else if (event.target.classList.contains("complete-button")){
                targetElement.classList.add("completed");
                targetObject.status = "done";
                event.target.remove();
            }
            // else if (event.target.classList.contains("project")){
            //     displayFullProject(targetObject);
            // }
            else {
                lastDisplayArg = targetObject;
                lastDisplayFunction = displayFullProject;
                lastDisplayFunction(lastDisplayArg);
            }
        } 
        
    }
    else if (event.target.tagName == "BUTTON") {
        console.log("BUTTTTON CLICKED");
        switch(event.target.textContent){
            case "Save":{
                const updateObject = formInput[0];
                console.log("save clicked");
                // console.log(formInput[0].title);
                // console.log(formInput);
                for(let i = 1; i<formInput.length; i++){
                    updateObject[formInput[i].name] = formInput[i].value;
                }
                lastDisplayFunction(lastDisplayArg);
                break;
            }
            case "Show All Projects":{
                lastDisplayFunction = displayAllProjects;
                lastDisplayArg = newDB;
                lastDisplayFunction(lastDisplayArg);
                break;
            }
            case "Show All ToDos":{
                lastDisplayFunction = displayAllToDos;
                lastDisplayArg = newDB;
                lastDisplayFunction(lastDisplayArg);
                break;
            }
            case "Load Demo Data":{
                console.log("sample data incoming");
                loadSampleData(newDB);
                lastDisplayFunction(lastDisplayArg);
                break;
            }
        }
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