var taskInput=document.getElementById
("new-task");//add a new task
var addButton=document.getElementsByTagName
("button")[0];//first button!
var incompleteTaskHolder=document.getElementById
("incomplete-tasks");//ul of #incomplete-tasks
var completedTaskHolder=document.getElementById
("completed-tasks");//completed tasks

//new task list item
var createNewTaskElement=function(taskString){
  var listItem=document.createElement("li");

  //input (checkbox)
  var checkBox=decument.createElement
  ("input");//checkbox
  //label
  var label=document.createElement("label");
  //input (text)
  var editInput=document.createElement
  ("input");
  //button.edit
  var editButton=document.createElement
  ("button");
  //button delete
  var deleteButton=document.createElement
  ("button");

  label.innerText=taskString;

  //each elements needs appending
  checkBox.type="checkbox";
  editInput.type="text";

  editButton.innerText="Edit";
  editButton.className="edit";
  deleteButton.innerText="Delete";
  deleteButton.className="delete";

  //and appending...
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;

}

var addTask=function(){
  console.log("Add Task...");

  var listItem=createNewTaskElement
  (taskInput.value);

  //Append listItem to incompleteTaskHolder
  console.log(listItem);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//edit an existing task
var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save' ");

var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');

var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if(containsClass){

    //switch to .editmode
    //label becomes the inputs value
    label.innerText=editInput.value;
  }
  else {
    editInput.value=label.innerText;
  }
    //toggle .editmode on the parent
  listItem.classList.toggle("editMode");

}

//Delete task
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul
  ul.removeChild(listItem);

}

//mark task completed
var taskCompleted=function(){
  console.log("Complete Task..");

  //Append the task list item to the #completed-tasks
  var listItem=this.parentNode;
  completedTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
    // bind lets you pass in what object the this keyword will resolve to in the body of the function

}

var taskIncomplete=function(){
  console.log("Incomplete Task...");

  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}   
  var ajaxRequest=function(){
    console.log("AJAX Request");
  }

  // set the click handler to the addTask function
  // addButton.onclick=addTask;
  addButton.addEventListener("click", addTask);
  addButton.addEventListener("click", ajaxRequest);

  var bindTaskEvents=function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");
    //select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");
      //bind editTask to edit button
        editButton.onclick=editTask;

        deleteButton.onclick=deleteTask;
        
        checkBox.onchange=checkBoxEventHandler;

  }

  //cycle over incompleteTaskHolder and then completed ul list items
  for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);

  }

  for(var i=0; i<completedTaskHolder.children.length; i++){
    bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
  }

