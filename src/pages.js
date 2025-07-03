import { statusListToDo } from "./objects";
//<div id="status-columns">
    //</div><div id="new">
    //</div>    <h2>New</h2>
    //</div>    <button class="newTodo" data-status="new">+ Create New</button>
    //</div>    <div class="todo">
    //</div>        <div class="todo-title">
    //</div>            <h3>Test Todo</h3>
    //</div>            <div class="delete-button" data-uid="test123">X</div>
    //</div>        </div>
    //</div>        <div>Some pretty text, lalalalalalala!!!!</div>
    //</div>        <button class="edit-button" data-uid="test123">edit</button>
    //</div>        <button class="complete-button" data-uid="test123">complete</button>
    //</div>    </div>
    //</div></div>
    //</div><div id="in-progress">
    //</div>    <h2>In-Progress</h2>
    //</div>    <button class="newTodo" data-status="in-progress">+ Create New</button>
    //</div></div>
    //</div><div id="done">
    //</div>    <h2>Done</h2>
    //</div>    <button class="newTodo" data-status="done">+ Create New</button>
    //</div></div>

function displayFullProject(project){
    const statusColumns = document.createElement("div");
    statusColumns.id = "status-columns";
    const newButton = document.createElement("button");
    newButton.classList.add("newTodo");
    newButton.textContent = "+ Create New";
    for(let i = 0; i < statusListToDo.length; i++){
        const statusDiv = document.createElement("div");
        statusDiv.id = statusListToDo[i].toLowerCase();
        const header2 = document.createElement("h2");
        header2.textContent = statusListToDo[i].toUpperCase();
        newButton.setAttribute("data-status", statusListToDo[i]);
        //set up a query for all todos linked to project, then a for loop to display them all


    }

    // create elements for project header
    const content = document.getElementById("content");
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

    //create elements for todo columns

    content.appendChild(header);
}


export {displayFullProject};