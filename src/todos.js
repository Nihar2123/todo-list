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
}

export function createTodoItem(title, description, dueDate = null, priority = 'low'){
    priority = checkPriority(priority);
    dueDate = checkDate(dueDate);
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