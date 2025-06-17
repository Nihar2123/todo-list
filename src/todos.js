import {format} from "date-fns"
import {createCheckListItem} from "./checklist"

class todoItem{
  constructor(title, description, dueDate, priority){
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.status = 'Not Completed';
      this.checklist = [];
  }

  addCheckList(title){
      this.checklist.push(createCheckListItem(title));
  }

  //-------------------- display Todo

  displayTodoDetails(){
      const currTodo = document.createElement("div");
      currTodo.classList.add('todoElement');
      currTodo.appendChild(this.displayTitleAndPriorityAndCheckBox());
      currTodo.appendChild(this.displayDescriptionAndDate());
      return currTodo;

  }

  displayDescriptionAndDate(){
      const descriptionContainerDiv = document.createElement("div");
      descriptionContainerDiv.classList.add('description-container');

      descriptionContainerDiv.appendChild(this.displayDescription());
      descriptionContainerDiv.appendChild(this.displayDueDate());
      return descriptionContainerDiv;
  }

  displayDescription(){
      const descriptionDiv = document.createElement("div");
      descriptionDiv.classList.add('description');
      descriptionDiv.innerText = `${this.description}`;
      return descriptionDiv;
  }

  displayDueDate(){
      const dateDiv = document.createElement("div");
      dateDiv.classList.add('date');
      let text = (this.dueDate === null)? 'no deadline': this.dueDate.toString();
      dateDiv.innerText = `${text}`;
      return dateDiv;
  }

  displayTitleAndPriorityAndCheckBox(){
      const titleContainerDiv = document.createElement("div");
      titleContainerDiv.classList.add('title-container');

      titleContainerDiv.appendChild(this.displayCheckBox());
      titleContainerDiv.appendChild(this.displayTitle());
      titleContainerDiv.appendChild(this.displayPriority());
      return titleContainerDiv;
  }

  displayCheckBox(){
      const checkboxDiv = document.createElement('input');
      checkboxDiv.classList.add('todoCheckbox');
      checkboxDiv.setAttribute('type', 'checkbox');
      return checkboxDiv;
  }

  displayTitle(){
      const titleSpan = document.createElement("span");
      titleSpan.innerHTML = this.title;
      return titleSpan;
  }

  displayPriority(){
      const prioritySpan = document.createElement("span");
      prioritySpan.classList.add('prioritySpan');
      prioritySpan.innerHTML = this.priority;
      prioritySpan.style.color = this.assignPriorityColor();
      return prioritySpan;
  }

  assignPriorityColor(){
      switch(this.priority){
          case 'high': return 'red';
          case 'medium': return 'yellow';
          case 'low': return 'green';
      }
  }
}

//-------------------------------------------

export function createTodoItem(title, description, dueDate = null, priority = 'low'){
    priority = checkPriority(priority);
    dueDate = checkDate(dueDate);
    description = checkDescription(description);
    return new todoItem(title, description, dueDate, priority);
}

function checkDate(date){
    if(date === null) return null;
    return format(date, 'dd-MM-yyyy');
}

function checkPriority(priority){
    if(priority === 'low' || priority === 'medium' || priority === 'high'){return priority;}
    if(priority < 4) return 'low';
    else if (priority < 8) return 'medium';
    else if(priority >= 8) return 'high';
}

function checkDescription(description){
    if(description === '')
        return '(〜^∇^)〜';
    else return description;
}