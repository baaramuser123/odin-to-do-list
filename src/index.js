import "./reset.css";
import "./style.css";
import { Database, ToDo, Project, statusListProject, statusListToDo, priorityList } from "./objects";
import { displayFullProject, displayAllToDos, displayAllProjects, displayNameChange} from "./pages";
import { format, addDays } from "date-fns";
import { createNewTodo } from "./buttons";

// Initialize Page
const newDB = new Database("Your Name", "orange");
const defaultProject = new Project(newDB, "Unassigned", "Default Project for all unassigned ToDos","N/A");


//test
// let testdate = format(new Date(), "yyyy-MM-dd");
// const newToDo = new ToDo(newDB, "test", "test desc", "new", testdate, "low", "P000000");

displayNameChange(newDB);
// const welcomeDialog = document.getElementById("name-change-dialog");
// welcomeDialog.showModal();


let lastDisplayFunction = displayAllProjects;
let lastDisplayArg = newDB;
lastDisplayFunction(lastDisplayArg);



console.log(newDB.projectArray);
console.log(newDB.todoArray);
// displayFullProject(newDB.projectArray[0]);
let objectCreationInput = {};
let objectEditInput = [];

document.addEventListener("click", (event) =>{
    if (event.target.classList.contains("button")){
        
        if(event.target.dataset.uid){
            // console.log(event.target);
            // const test = document.getElementById("view-projects");
            // console.log(test);
            // console.log(event.target.closest(".project"));
            console.log("click dataset");
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
                if(targetObjectType == "todo"){
                    targetObject.projectID = "";
                }
                const targetObjectIndex = targetArray.findIndex(filter);
                targetArray.splice(targetObjectIndex, 1);
                targetElement.remove();
                
                console.log(newDB.projectArray);
            }

            else if (event.target.classList.contains("edit-button")){
                //experimental
                objectEditInput = [];
                objectEditInput.push(targetObject);
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
                        objectEditInput.push(select);
                        //experimental
                    }
                    else if(key == "description"){
                        const input = document.createElement("textarea");
                        input.setAttribute("rows", "5");
                        input.setAttribute("cols", "50");
                        input.setAttribute("name", key);
                        input.id = `edit-${targetObjectType}-${key}`;
                        input.defaultValue = targetObject[key];
                        //experimental
                        objectEditInput.push(input);
                        //experimental
                        form.appendChild(input); 
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
                        objectEditInput.push(select);
                        //experimental
                    }
                    else if (key == "dueDate"){

                        const input = document.createElement("input");
                        input.setAttribute("type", "date");
                        input.setAttribute("name", key);
                        input.id = `edit-${targetObjectType}-${key}`;
                        input.defaultValue = targetObject[key];
                        //experimental
                        objectEditInput.push(input);
                        //experimental
                        form.appendChild(input);

                    }
                    else if (key == "_projectID"){
                        label.textContent = "PROJECT: ";
                        const select = document.createElement("select");
                        select.setAttribute("name", "projectID");
                        select.id = `edit-todo-projectID`;
                        for(let i =0; i<newDB.projectArray.length; i++){
                            const option = document.createElement("option");
                            option.setAttribute("value", newDB.projectArray[i].uniqueID);
                            option.textContent = newDB.projectArray[i].title.toUpperCase();
                            select.appendChild(option);
                            //default project assignment if available
                            if(targetObject[key]){
                                select.value = targetObject[key];
                            }
                        }
                        form.appendChild(select);
                        //experimental
                        objectEditInput.push(select);

                    }
                    else{
                        const input = document.createElement("input");
                        input.setAttribute("type", "text");
                        input.setAttribute("name", key);
                        input.id = `edit-${targetObjectType}-${key}`;
                        input.defaultValue = targetObject[key];
                        //experimental
                        objectEditInput.push(input);
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
                if(lastDisplayFunction==displayFullProject){
                    lastDisplayFunction(lastDisplayArg);
                }
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
        else if (event.target.classList.contains("owner")){
            console.log("smiles");
            displayNameChange(newDB);
        }
        
    }
    else if (event.target.tagName == "BUTTON") {
        console.log("BUTTTTON CLICKED");
        switch(event.target.textContent){
            case "Save":{
                if (event.target.id == "save-new-project"){
                    console.log(objectCreationInput);
                    const newProject = new Project(newDB, objectCreationInput.title.value, objectCreationInput.description.value, objectCreationInput.status.value);
                    if(lastDisplayFunction !== displayAllProjects){
                        lastDisplayFunction = displayFullProject;
                        lastDisplayArg = newProject;
                    }
                    lastDisplayFunction(lastDisplayArg);
                }
                else if (event.target.id == "save-new-todo"){
                    console.log(objectCreationInput);
                    const newTodo = new ToDo(newDB, objectCreationInput.title.value, objectCreationInput.description.value, objectCreationInput.status.value, objectCreationInput.dueDate.value, objectCreationInput.priority.value, objectCreationInput._projectID.value);
                    // if(lastDisplayFunction !== displayAllProjects){
                    //     lastDisplayFunction = displayFullProject;
                    //     lastDisplayArg = newProject;
                    // }
                    lastDisplayFunction(lastDisplayArg);
                }
                else if (event.target.id == "save-owner-changes"){
                    const nameEntry = document.getElementById("owner-name-entry");
                    const colorEntry = document.getElementById("owner-color");
                    newDB.ownerName = nameEntry.value;
                    newDB.favColor = colorEntry.value;
                    const nameElement = document.getElementById("owner-name");
                    nameElement.textContent = newDB.ownerName;
                }
                else{
                    const updateObject = objectEditInput[0];
                    console.log("save clicked");
                    // console.log(objectEditInput[0].title);
                    // console.log(objectEditInput);
                    for(let i = 1; i<objectEditInput.length; i++){
                        updateObject[objectEditInput[i].name] = objectEditInput[i].value;
                    }
                    lastDisplayFunction(lastDisplayArg);
                }
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
            case "Unassigned ToDos":{
                lastDisplayFunction = displayFullProject;
                lastDisplayArg = newDB.projectArray[0];
                lastDisplayFunction(lastDisplayArg);
                break;
            }
            case "Load Demo Data":{
                console.log("sample data incoming");
                loadSampleData(newDB);
                lastDisplayFunction(lastDisplayArg);
                break;
            }
            default:{
                if(event.target.classList.contains("new-project")){
                    objectCreationInput = {};
                    // objectEditInput.push(targetObject);
                    //experimental
                    const modal = document.getElementById("project-edit");
                    const form = document.getElementById("project-form");
                    form.textContent = "";
                    // let testObject = new Project(newDB, "test", "Test", "test");
                    let testObject = new Project();
                    let targetStatusList = statusListProject;
                    for(let key in testObject){
                        if(key == "uniqueID" || key == "todoArray" || key == "database") continue;
                        const label = document.createElement("label");
                        label.setAttribute("for", `edit-project-${key}`);
                        label.textContent = key.toUpperCase() + ": ";
                        form.appendChild(label);
                        if(key == "status"){
                            const select = document.createElement("select");
                            select.setAttribute("name", key);
                            select.id = `edit-project-${key}`;
                            for(let stat in targetStatusList){
                                const option = document.createElement("option");
                                option.setAttribute("value", targetStatusList[stat]);
                                option.textContent = targetStatusList[stat].toUpperCase();
                                select.appendChild(option);
                                // select.value = targetObject[key];
                                form.appendChild(select);
                            }
                            //experimental
                            // objectEditInput.push(select);
                            objectCreationInput.status = select;
                            //experimental
                        }
                        else if (key == "priority"){
                            const select = document.createElement("select");
                            select.setAttribute("name", key);
                            select.id = `edit-project-${key}`;

                            for(let val in priorityList){
                                const option = document.createElement("option");
                                option.setAttribute("value", priorityList[val]);
                                option.textContent = priorityList[val].toUpperCase();
                                select.appendChild(option);
                                // select.value = targetObject[key];
                                form.appendChild(select);
                            }
                            //experimental
                            // objectEditInput.push(select);
                            objectCreationInput.priority = select;
                            //experimental
                        }
                        else if(key == "description"){
                            const input = document.createElement("textarea");
                            input.setAttribute("rows", "5");
                            input.setAttribute("cols", "50");
                            input.setAttribute("name", key);
                            input.id = `edit-project-${key}`;
                            //experimental
                            objectCreationInput.description=input;
                            //experimental
                            form.appendChild(input); 
                        }
                        else{
                            const input = document.createElement("input");
                            input.setAttribute("type", "text");
                            input.setAttribute("name", key);
                            input.id = `edit-project-${key}`;
                            //experimental
                            // objectEditInput.push(input);
                            objectCreationInput[key] = input;
                            //experimental
                            form.appendChild(input);
                        }
                    }
                    const saveButton = document.createElement("button");
                    const cancelButton = document.createElement("button");
                    saveButton.textContent = "Save";
                    saveButton.id = "save-new-project";
                    cancelButton.textContent = "Cancel";
                    form.append(cancelButton, saveButton);
                    //pop up modal to make changes
                    modal.showModal();
                }
                else if (event.target.classList.contains("newTodo")){
                    console.log("click");
                    objectCreationInput = createNewTodo(event, newDB.projectArray);
                }
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
        due = format(due, "yyyy-MM-dd");
        const priorityValues = ["high", "low"];
        let priority = priorityValues[Math.floor(Math.random() * 2)];
        let project = database.projectArray[Math.floor(Math.random() * database.projectArray.length)].uniqueID;
        // let project = database.projectArray[0].uniqueID;
        let todo = new ToDo(database, title, desc, status, due, priority, project);
        // database.todoArray.push(todo);
    }
}