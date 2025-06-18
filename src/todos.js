import {format} from "date-fns"
import {createCheckListItem} from "./checklist"
import binImage from "./icons/trash.svg"

class todoItem{
  constructor(title, description, dueDate, priority){
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.status = 'Not Completed';
      this.checklist = [];
  }

  //-------------------- display Todo

  displayTodoDetails(){
      const currTodo = document.createElement("div");
      currTodo.classList.add('todoElement');
      const checklistDropdownDiv = document.createElement("div");
      checklistDropdownDiv.appendChild(this.displayTitleAndPriorityAndCheckBox(currTodo));
      checklistDropdownDiv.appendChild(this.displayDescriptionAndDate());
      currTodo.appendChild(checklistDropdownDiv);

      const allCheckListItemsDiv = document.createElement("div");
      allCheckListItemsDiv.classList.add('allCheckListItems');
      currTodo.appendChild(this.displayTodoStatusBar(allCheckListItemsDiv));
      currTodo.appendChild(allCheckListItemsDiv);
      this.displayChecklist(checklistDropdownDiv, allCheckListItemsDiv);
      return currTodo;
  }

  displayTodoStatusBar(allCheckListItemsDiv){
      const statusBar = document.createElement("div");
      statusBar.classList.add('statusBar');
      const statusBarInput = document.createElement("input");
      statusBarInput.type = "text";
      statusBarInput.classList.add('statusBarInput');
      const plusSymbol = document.createElement("span");
      plusSymbol.innerText = "+";
      this.checklistInput(plusSymbol,statusBar, allCheckListItemsDiv);
      const image = document.createElement("img");
      image.src = binImage;
      statusBar.appendChild(statusBarInput);
      statusBar.appendChild(plusSymbol);
      statusBar.appendChild(image);
      return statusBar;
  }

  checklistInput(submit,statusBar, allCheckListItemsDiv){
      submit.addEventListener("click", ()=>{
          const statusBarInput = statusBar.querySelector(".statusBarInput");
          const text = statusBarInput.value;console.log(statusBarInput);
          if(text !== ''){
              this.addCheckList(text);
              statusBarInput.value = '';
              this.displayAllCheckListItems(allCheckListItemsDiv);
          }
      })
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

  displayTitleAndPriorityAndCheckBox(currTodo){
      const titleContainerDiv = document.createElement("div");
      titleContainerDiv.classList.add('title-container');

      titleContainerDiv.appendChild(this.displayCheckBox(currTodo, this));
      titleContainerDiv.appendChild(this.displayTitle());
      titleContainerDiv.appendChild(this.displayPriority());
      return titleContainerDiv;
  }

  displayCheckBox(currTodo, ref){
      const checkboxDiv = document.createElement('input');
      checkboxDiv.classList.add('todoCheckbox');
      checkboxDiv.setAttribute('type', 'checkbox');
      if(ref.status === 'Completed'){
          checkboxDiv.setAttribute('checked', 'checked');
          currTodo.classList.add('completed');
      }
      this.checkBoxMark(currTodo, checkboxDiv, ref);
      return checkboxDiv;
  }

  checkBoxMark(currTodo, checkboxDiv, ref){
      checkboxDiv.addEventListener('change', function(e) {
          if(ref.status === 'Not Completed'){
              ref.status = 'Completed';
              currTodo.classList.add('completed');
          }
          else{
              ref.status = 'Not Completed';
              currTodo.classList.remove('completed');
          }
      })
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

    //-----------------------checklists

    displayChecklist(currTodo, allCheckListItemsDiv){
      let toggle = true;
        currTodo.addEventListener("click", ()=>{
            if(toggle){
                toggle = false;
                this.displayAllCheckListItems(allCheckListItemsDiv);
            }
            else{
                toggle = true;
                allCheckListItemsDiv.innerHTML = '';
            }
        })
    }

    displayAllCheckListItems(allCheckListItemsDiv){
        allCheckListItemsDiv.innerHTML = '';
      this.checklist.forEach((item)=> {
          allCheckListItemsDiv.appendChild(this.displayCheckListItem(item));
      })
        return allCheckListItemsDiv;
    }

    displayCheckListItem(item){
      const checklistDiv = document.createElement("div");
      checklistDiv.classList.add('checklist');

      checklistDiv.appendChild(this.displayCheckBox(checklistDiv, item));
      const checkBox  = checklistDiv.querySelector('input');
      let currId = `checklist${generateUniqueId()}`;
      checkBox.id = currId;

      const checklistText = document.createElement("label");
      checklistText.setAttribute("for", currId);
      checklistText.innerText = item.title;
      checklistDiv.appendChild(checklistText);
      return checklistDiv;
    }

    addCheckList(title){
        this.checklist.push(createCheckListItem(title));
    }
}


//-------------------------------------------

let uniqueIdCounter = 0;

function generateUniqueId() {
    uniqueIdCounter++;
    return `element-${uniqueIdCounter}`; // Generate a unique ID string
}

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