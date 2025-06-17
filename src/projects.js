import {createTodoItem} from "./todos"

class project{
    constructor(title, description){
        this.todos = [];
        this.title = title;
        this.description = description;
        this.htmlProjectElement = this.displayProject();
    }

    addTodo(title, description, dueDate = null, priority = 'low'){
        this.todos.push(createTodoItem(title, description, dueDate, priority));
        this.updateDisplayProject();
    }

    displayProject(){
        const myProjects = document.querySelector('.myProjects');console.log(myProjects);
        const newProject = document.createElement('div');
        newProject.classList.add('projectSidebarElement');
        newProject.textContent = `${this.title} (${this.todos.length})`;
        myProjects.appendChild(newProject);
        return newProject;
    }

    updateDisplayProject(){
        this.htmlProjectElement.textContent = `${this.title} (${this.todos.length})`;
    }
}

export function createProject(title, description){
    return new project(title, description);
}