// import { JavascriptModulesPlugin } from "webpack";
import { format } from "date-fns";
import { ToDo, statusListToDo, priorityList } from "./objects";
export {createNewTodo};

function createNewTodo(event, projectArray){
    let objectCreationInput = {};
    // objectEditInput.push(targetObject);
    //experimental
    const modal = document.getElementById("todo-edit");
    const form = document.getElementById("todo-form");
    form.textContent = "";
    const defaultStatus = event.target.dataset.status;
    
    // let testObject = new todo(newDB, "test", "Test", "test");
    let testObject = new ToDo();
    let targetStatusList = statusListToDo;
    for(let key in testObject){
        if(key == "uniqueID" || key == "todoArray" || key == "database") continue;
        const label = document.createElement("label");
        label.setAttribute("for", `edit-todo-${key}`);
        label.textContent = key.toUpperCase() + ": ";
        form.appendChild(label);
        if(key == "status"){
            const select = document.createElement("select");
            select.setAttribute("name", key);
            select.id = `edit-todo-${key}`;
            for(let stat in targetStatusList){
                const option = document.createElement("option");
                option.setAttribute("value", targetStatusList[stat]);
                option.textContent = targetStatusList[stat].toUpperCase();
                select.appendChild(option);
                // select.value = targetObject[key];
                select.value = defaultStatus;
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
            select.id = `edit-todo-${key}`;

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
        else if (key == "_projectID"){
            label.textContent = "PROJECT: ";
            const select = document.createElement("select");
            select.setAttribute("name", key);
            select.id = `edit-todo-projectID`;
            for(let i =0; i<projectArray.length; i++){
                const option = document.createElement("option");
                option.setAttribute("value", projectArray[i].uniqueID);
                option.textContent = projectArray[i].title.toUpperCase();
                select.appendChild(option);
                //default project assignment if available
                if(event.target.dataset.project_id){
                    select.value = event.target.dataset.project_id;
                }
            }
            form.appendChild(select);
            //experimental
            // objectEditInput.push(select);
            objectCreationInput._projectID = select;

        }
        else if (key == "dueDate"){
            const input = document.createElement("input");
            input.setAttribute("type", "date");
            input.setAttribute("name", key);
            input.id = `edit-todo-${key}`;
            input.value = format(new Date(), "yyyy-MM-dd");
            //experimental
            // objectEditInput.push(input);
            objectCreationInput[key] = input;
            //experimental
            form.appendChild(input);
        }
        else if(key == "description"){
            const input = document.createElement("textarea");
            input.setAttribute("rows", "5");
            input.setAttribute("cols", "50");
            input.setAttribute("name", key);
            input.id = `edit-todo-${key}`;
            //experimental
            objectCreationInput[key]=input;
            //experimental
            form.appendChild(input); 
        }
        else{
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("name", key);
            input.id = `edit-todo-${key}`;
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
    saveButton.id = "save-new-todo";
    cancelButton.textContent = "Cancel";
    form.append(cancelButton, saveButton);
    //pop up modal to make changes
    modal.showModal();
    return objectCreationInput;
}