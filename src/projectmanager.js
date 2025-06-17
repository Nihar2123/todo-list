import {createProject} from "./projects";
import binImage from "./icons/trash.svg"

class projectList{
    constructor(){
        this.list = [];
        this.addButton = this.getAddProjectButton();
        this.buttonClick();
        this.activeProject = null;
        this.prevActiveProject = null;
        this.initiateAddTodo();
    }

    buttonClick(){
        this.addButton.addEventListener('click', ()=>{
            this.createProjectInputAreas();
        })
    }

    initiateAddTodo(){
        const submit = document.querySelector('.save');
        submit.addEventListener('click', (e)=>{
            e.preventDefault();
            this.activeProject.saveDialogInfo();
        })
    }

    createProjectInputAreas(){
        const inputArea = document.querySelector('.projectInput');
        inputArea.innerText = '';
        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('placeholder', 'Title');
        titleInput.classList.add('title');

        const descriptionInput = document.createElement('textarea');
        descriptionInput.setAttribute('type', 'text');
        descriptionInput.setAttribute('placeholder', 'Description');
        descriptionInput.classList.add('area');

        const inputButton = document.createElement('button');
        inputButton.innerText = 'Create';
        inputButton.addEventListener('click', ()=>{
            let titleText = titleInput.value;
            let descriptionText = descriptionInput.value;
            if(titleText === '') titleText = 'default';
            this.addProject(titleText, descriptionText);
            inputArea.innerText = '';
        })

        inputArea.appendChild(titleInput);
        inputArea.appendChild(descriptionInput);
        inputArea.appendChild(inputButton);
    }

    displayAllProjects(){
        const myProjects = document.querySelector('.myProjects');
        myProjects.innerHTML = '';
        this.list.forEach(item=>{
            item.htmlProjectElement = this.displayProject(item, myProjects);
        })
    }

    displayProject(currProject, myProjects){
        const newProject = document.createElement('div');
        newProject.classList.add('projectSidebarElement');
        const newProjectText = document.createElement('a');
        newProjectText.textContent = `${currProject.title} (${currProject.todos.length})`;
        newProject.appendChild(newProjectText);
        const image = document.createElement("img");
        image.src = binImage;

        newProjectText.addEventListener('click', ()=>{
            this.openProjectWindow(currProject);
        })
        image.addEventListener('click', ()=>{
            this.removeProject(currProject, myProjects);console.log(this.list);
            myProjects.removeChild(newProject);
        })

        newProject.appendChild(image);
        myProjects.appendChild(newProject);
        return newProject;
    }

    openProjectWindow(currProject){
        if(this.prevActiveProject !== null){
            this.prevActiveProject.classList.remove('active');
        }
        currProject.htmlProjectElement.classList.add('active');
        this.activeProject = currProject;
        this.prevActiveProject = currProject.htmlProjectElement;

        currProject.displayProjectDetails();
    }

    removeProject(currProject, myProjects){
        this.list.forEach((item, index) =>{
            if(item === currProject){
                this.list.splice(index, 1);
            }
        })
    }

    addProject(title = 'default', description = ''){
        this.list.push(createProject(title, description));
        this.displayAllProjects();
    }

    getAddProjectButton(){
        return document.getElementById('addProjectButton');
    }
}

export default new projectList();
