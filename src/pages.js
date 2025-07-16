import { statusListToDo } from "./objects";

function displayFullProject(project){
    

    // create elements for project header
    const content = document.getElementById("content");
    content.textContent = "";
    const header = document.createElement("div");
    header.id = "project-header";
    const title = document.createElement("h1");
    title.textContent = project.title;
    const description = document.createElement("div");
    description.id = "desc";
    description.textContent = `Description: ${project.description}`;
    const status = document.createElement("div");
    status.classList.add("col1");
    status.textContent = `Status: ${project.status}`;
    const uID = document.createElement("div");
    uID.classList.add("col2");
    uID.textContent = `Unique ID: ${project.uniqueID}`;
    const open = document.createElement("div");
    open.classList.add("col1");
    open.textContent = `ToDos Open: ${project.openToDos}`;
    const closed = document.createElement("div");
    closed.classList.add("col2");
    closed.textContent = `ToDos Completed: ${project.completedToDos}`;
    header.append(title, description, status, uID, open, closed);

    // Status Columns
    const statusColumns = document.createElement("div");
    statusColumns.id = "status-columns";
    const newButton = document.createElement("button");
    newButton.classList.add("newTodo", "button");
    newButton.textContent = "+ Create New";
    for(let i = 0; i < statusListToDo.length; i++){
        const statusDiv = document.createElement("div");
        statusDiv.id = statusListToDo[i].toLowerCase();
        const header2 = document.createElement("h2");
        header2.textContent = statusListToDo[i].toUpperCase();
        const currentButton = newButton.cloneNode(true);
        currentButton.setAttribute("data-status", statusListToDo[i]);
        statusDiv.append(header2, currentButton);
        //find and list out all project's todos for given status
        const matchingTodos = project.todoArray.filter((todo)=>todo.status === statusListToDo[i]);
        console.log(matchingTodos);
        for(let k = 0; k < matchingTodos.length; k++){
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo");
            //title section
            const todoTitle = document.createElement("div");
            todoTitle.classList.add("todo-title");
            const header3 = document.createElement("h3");
            // header3.textContent = project.todoArray[k].title;
            header3.textContent = matchingTodos[k].title;
            const deleteButton = document.createElement("div");
            deleteButton.classList.add("delete-button", "button");
            deleteButton.textContent = "X";
            deleteButton.setAttribute("data-uid", matchingTodos[k].uniqueID);
            todoTitle.append(header3, deleteButton);
            //body section
            const descDiv = document.createElement("div");
            descDiv.textContent = matchingTodos[k].description;
            const editButton = document.createElement("button");
            editButton.classList.add("edit-button", "button");
            editButton.setAttribute("data-uid", matchingTodos[k].uniqueID);
            editButton.textContent = "edit";
            const completeButton = document.createElement("button");
            completeButton.classList.add("complete-button", "button");
            completeButton.setAttribute("data-uid", matchingTodos[k].uniqueID);
            completeButton.textContent = "complete";

            todoItem.append(todoTitle, descDiv, editButton, completeButton);
            statusDiv.appendChild(todoItem);

        }

        statusColumns.appendChild(statusDiv);
    }
    //end for loops
    content.append(header, statusColumns);
}


function displayAllToDos(database){
    const content = document.getElementById("content");
    content.textContent = "";
    const allTodo = document.createElement("div");
    allTodo.id = "all-todo";
    allTodo.classList.add("grid-general");
    const newButton = document.createElement("button");
    newButton.classList.add("newTodo", "button");
    newButton.textContent = "+ Create New";
    newButton.setAttribute("data-status", "new");
    allTodo.appendChild(newButton);

    const matchingTodos = database.todoArray;
        for(let i = 0; i < matchingTodos.length; i++){
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo");
            //title section
            const todoTitle = document.createElement("div");
            todoTitle.classList.add("todo-title");
            const header3 = document.createElement("h3");
            header3.textContent = database.todoArray[i].title;
            const deleteButton = document.createElement("div");
            deleteButton.classList.add("delete-button", "button");
            deleteButton.textContent = "X";
            deleteButton.setAttribute("data-uid", database.todoArray[i].uniqueID);
            todoTitle.append(header3, deleteButton);
            //body section
            const descDiv = document.createElement("div");
            descDiv.textContent = database.todoArray[i].description;
            const editButton = document.createElement("button");
            editButton.classList.add("edit-button", "button");
            editButton.setAttribute("data-uid", database.todoArray[i].uniqueID);
            editButton.textContent = "edit";
            const completeButton = document.createElement("button");
            completeButton.classList.add("complete-button", "button");
            completeButton.setAttribute("data-uid", database.todoArray[i].uniqueID);
            completeButton.textContent = "complete";

            todoItem.append(todoTitle, descDiv, editButton, completeButton);
            allTodo.appendChild(todoItem);
        }
        content.appendChild(allTodo);
}


function displayAllProjects(database){
    const content = document.getElementById("content");
    content.textContent = "";
    const allProjects = document.createElement("div");
    allProjects.id = "all-projects";
    allProjects.classList.add("grid-general");
    const newButton = document.createElement("button");
    newButton.classList.add("new-project", "button");
    newButton.textContent = "+ Create New";
    newButton.setAttribute("data-status", "new");
    allProjects.appendChild(newButton);

    const projects = database.projectArray;
        for(let i = 0; i < projects.length; i++){
            const projectItem = document.createElement("div");
            projectItem.classList.add("project", "button");
            projectItem.setAttribute("data-uid", database.projectArray[i].uniqueID);
            if(projects[i].status == "done") projectItem.classList.add("completed");
            //title section
            const projectTitle = document.createElement("div");
            projectTitle.classList.add("project-title", "button");
            projectTitle.setAttribute("data-uid", database.projectArray[i].uniqueID);
            const header3 = document.createElement("h3");
            header3.textContent = database.projectArray[i].title;
            const deleteButton = document.createElement("div");
            deleteButton.classList.add("delete-button", "button");
            deleteButton.textContent = "X";
            deleteButton.setAttribute("data-uid", database.projectArray[i].uniqueID);
            projectTitle.append(header3, deleteButton);
            //body section
            const descDiv = document.createElement("div");
            descDiv.textContent = database.projectArray[i].description;
            descDiv.classList.add("button");
            descDiv.setAttribute("data-uid", database.projectArray[i].uniqueID);
            const editButton = document.createElement("button");
            editButton.classList.add("edit-button", "button");
            editButton.setAttribute("data-uid", database.projectArray[i].uniqueID);
            editButton.textContent = "edit";
            const completeButton = document.createElement("button");
            completeButton.classList.add("complete-button", "button");
            completeButton.setAttribute("data-uid", database.projectArray[i].uniqueID);
            completeButton.textContent = "complete";

            projectItem.append(projectTitle, descDiv, editButton, completeButton);
            allProjects.appendChild(projectItem);
        }
        content.appendChild(allProjects);
}

export {displayFullProject, displayAllToDos, displayAllProjects};