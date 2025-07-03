class Database {
    constructor(name, color){
        this.ownerName = name;
        this.favColor = color;
    }

    projectArray = [];

    todoArray = [];
}


class ToDo {
    constructor(database, title, description, status,
         dueDate, priority, project){
        this.title=title;
        this.description=description;
        this.status=status;
        this.dueDate=dueDate;
        this.priority=priority;
        this.database = database;
        this.projectID=project;
        ToDo.counter++;
        database.todoArray.push(this);
    }

    static counter = 0;

    // uniqueID = crypto.randomUUID();
    uniqueID = "T" + ToDo.counter.toString().padStart(6, "0");


    get projectID(){
        return this._projectID;
    }

    set projectID(value){
        //remove todo from prior project attachment
        if(this._projectID !== undefined && this._projectID !== null){
            const projFilter = (element) => element.uniqueID == this._projectID;
            const originalProject = this.database.projectArray.find(projFilter);
            const todoFilter = (element) => element === this;
            const todotoremove = originalProject.todoArray.findIndex(todoFilter);
            originalProject.todoArray.splice(todotoremove,1);
        }
        this._projectID = value;
        const projFilter2 = (element) => element.uniqueID == this._projectID;
        const newProject = this.database.projectArray.find(projFilter2);
        newProject.todoArray.push(this);
    }
}


class Project {
    constructor(database, title, description, status){
        this.title=title;
        this.description=description;
        this.status=status;
        Project.counter++;
        database.projectArray.push(this);
    }


    static counter = 0;

    // uniqueID = crypto.randomUUID();
    uniqueID = "P" + Project.counter.toString().padStart(6, "0");

    todoArray = [];

    get openToDos(){
        const open = this.todoArray.filter((todo)=>todo.status !== "done");
        return open.length;
    }

    get completedToDos(){
        const open = this.todoArray.filter((todo)=>todo.status == "done");
        return open.length;
    }
}

const statusListProject = ["new", "in-progress", "done"];
const statusListToDo = ["new", "in-progress", "done"];


export {Database, ToDo, Project, statusListProject, statusListToDo};