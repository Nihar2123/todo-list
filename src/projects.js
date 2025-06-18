import {createTodoItem} from "./todos"

class project{
    constructor(title, description){
        this.todos = [];
        this.title = title;
        this.description = description;
        this.htmlProjectElement = null;
        this.active = false;

        this.manageDialog();
    }

    manageDialog(){
        const dialog = document.querySelector('#dialogForm');
        this.openDialog(dialog);
        this.closeDialog(dialog);
    }

    saveDialogInfo(){
            const title = document.getElementById("title").value;
            if(title === '') {
                this.resetDialog();
                return;
            }

            const description = document.getElementById("description").value;
            let dueDate = document.getElementById("dueDate").value;
            if(dueDate === '') dueDate = null;

            const priority = document.querySelector('input[name="priority"]:checked').value;
            this.addTodo(title, description,dueDate, priority);console.log(this.todos);

            const dialog = document.querySelector('#dialogForm');
            dialog.close();
            this.resetDialog();

            this.displayProjectDetails();
    }

    resetDialog(){
        document.getElementById("title").value = '';
        document.getElementById("description").value = '';
        document.querySelector('input[name="priority"][value="low"]').checked = true;
    }

    openDialog(dialog){
        const dialogButton = document.querySelector('#addTodoButton');
        dialogButton.addEventListener('click', ()=>{
            dialog.showModal();
        })
    }

    closeDialog(dialog){
        const closeButton = document.querySelector('.cancel');
        closeButton.addEventListener('click', ()=>{
            dialog.close();
        })
    }

    addTodo(title, description, dueDate = null, priority = 'low'){
        this.todos.push(createTodoItem(title, description, dueDate, priority));
        this.updateDisplayProject();
    }

    //-------------------- Project Window
    removeDisplayProjectDetails(){
        this.active = false;
        this.displayProjectHeaderName();
        this.displayProjectDescription();
        this.displayAllTodos();
    }

    displayProjectDetails(){
        this.active = true;
        this.displayProjectHeaderName();
        this.displayProjectDescription();
        this.displayAllTodos();
    }

    displayProjectHeaderName(){
        const headerDiv = document.querySelector('#projectName');
        headerDiv.innerHTML = (this.active)? this.title: '';
    }

    displayProjectDescription(){
        const descriptionDiv = document.querySelector('.projectDescription');
        let description = (this.description === '')? '.;-;-' : this.description;
        descriptionDiv.innerHTML = this.active? `Description: \xa0\xa0${description}` : '';
    }

    //-------------------- Todos
    displayAllTodos(){
        const todoDisplay = document.querySelector('.myTodos');
        todoDisplay.innerHTML = '';
        if(this.active) {
            this.todos.forEach(item => {
                this.displayTodo(item, todoDisplay);
            })
        }
    }

    displayTodo(todo, container){
        const todoContainer = todo.displayTodoDetails();
        if(todo.status === 'Completed')
            todoContainer.classList.add('completed');
        else
            todoContainer.classList.remove('completed');
        this.deleteTodo(todo, todoContainer, container)
        container.appendChild(todoContainer);
    }

    deleteTodo(todo, todoContainer, container){
        const image = todoContainer.querySelector('img');
        image.addEventListener('click', ()=>{
            container.removeChild(todoContainer);
            this.deleteTodoData(todo);
            this.updateDisplayProject();
        })
    }

    deleteTodoData(todo){
        this.todos.forEach((item, index) => {
            if(item === todo){
                this.todos.splice(index, 1);
            }
        })
    }



    //-------------------- SideBar

    updateDisplayProject(){
        const displayText = this.htmlProjectElement.children[0];
        displayText.innerText = `${this.title} (${this.todos.length})`;
    }
}

export function createProject(title, description){
    return new project(title, description);
}