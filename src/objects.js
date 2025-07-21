
class Database {
    constructor(name, color){
        this.ownerName = name;
        this._favColor = color;
    }

    get favColor(){
        return this._favColor;
    }

    set favColor(color){
        const root = document.querySelector(':root');
        switch(color){
            case "blue":{
                root.style.setProperty('--chosen-color-main', '#34699A');
                root.style.setProperty('--chosen-color-dull', '#aacbe9ff');
                break;
            }
            case "orange":{
                root.style.setProperty('--chosen-color-main', '#cc930f');
                root.style.setProperty('--chosen-color-dull', '#fff8d5');
                break;
            }
            case "green":{
                root.style.setProperty('--chosen-color-main', '#5E936C');
                root.style.setProperty('--chosen-color-dull', '#E8FFD7');
                break;
            }
            case "red":{
                root.style.setProperty('--chosen-color-main', '#a73c3cff');
                root.style.setProperty('--chosen-color-dull', '#ffb4b4ff');
                break;
            }
            case "pink":{
                // '#F564A9'
                root.style.setProperty('--chosen-color-main', '#ce528eff');
                root.style.setProperty('--chosen-color-dull', '#ffdcdcff');
                break;
            }
            case "purple":{
                root.style.setProperty('--chosen-color-main', '#7F55B1');
                root.style.setProperty('--chosen-color-dull', '#bba3d8ff');
                break;
            }
            case "slate":{
                root.style.setProperty('--chosen-color-main', '#6b6b6bff');
                root.style.setProperty('--chosen-color-dull', '#e0e0e0ff');
                break;
            }
            default:
        }
        this._favColor = color;
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
        if(database) database.todoArray.push(this);
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
            console.log("cleaning old project");
            const projFilter = (element) => element.uniqueID == this._projectID;
            const originalProject = this.database.projectArray.find(projFilter);
            console.log("project found named " +originalProject.title);
            const todoFilter = (element) => element === this;
            const todotoremove = originalProject.todoArray.findIndex(todoFilter);
            originalProject.todoArray.splice(todotoremove,1);
        }
        this._projectID = value;
        const projFilter2 = (element) => element.uniqueID == this._projectID;
        //added
        if(this.database && value!=="") {
            const newProject = this.database.projectArray.find(projFilter2);
            newProject.todoArray.push(this);
        }
    }
}


class Project {
    constructor(database, title, description, status){
        this.title=title;
        this.description=description;
        this.status=status;
        Project.counter++;
        if(database) database.projectArray.push(this);
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
const priorityList = ["low", "high"];


export {Database, ToDo, Project, statusListProject, statusListToDo, priorityList};