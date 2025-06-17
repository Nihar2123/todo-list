import {createProject} from "./projects";

class projectList{
    constructor(){
        this.list = [];
        this.addButton = this.getAddProjectButton();
        this.buttonClick();
    }

    buttonClick(){
        this.addButton.addEventListener('click', ()=>{
            this.createProjectInputAreas();
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

    addProject(title = 'default', description = ''){
        this.list.push(createProject(title, description));
    }

    getAddProjectButton(){
        return document.getElementById('addProjectButton');
    }
}

export default new projectList();
