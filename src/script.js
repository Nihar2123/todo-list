import "./style.css"
import "./sidepanel.css"
import "./projectWindow.css"
import "./todoDisplay.css"
import "./notes.css"
import "./todoDialog.css"

//import {createTodoItem} from "./todos"
import {createProject} from "./projects";
import projectList from "./projectmanager"

projectList.addProject();
projectList.addProject("Home", 'Thing to do when free');
projectList.list[0].addTodo("Test", "Trying to create a Todo Item", new Date(), '9');
projectList.list[0].todos[0].addCheckList('SubTask no. 1');
// projectList.list[0].displayProject();
// projectList.list[1].displayProject();

// const proj = createProject();
// proj.addTodoItem("Test", "Trying to create a Todo Item", new Date(), '9');
// proj.todos[0].addCheckListItem('SubTask no. 1');

// const x = createTodoItem("Test", "Trying to create a Todo Item", new Date(), '9');
// x.addCheckListItem('SubTask no. 1');
console.log(projectList);