function addTask(){

let text = document.getElementById("taskInput").value;
let priority = document.getElementById("priority").value;

if(text === "") return;

let task = document.createElement("div");

task.className = "task " + priority;
task.innerText = text;
task.draggable = true;

task.id = "task" + Date.now();

task.ondragstart = drag;

document.getElementById("todo").appendChild(task);

saveBoard();

document.getElementById("taskInput").value = "";
}

function allowDrop(e){
e.preventDefault();
}

function drag(e){
e.dataTransfer.setData("text", e.target.id);
}

function drop(e){

e.preventDefault();

let id = e.dataTransfer.getData("text");
let task = document.getElementById(id);

e.target.closest(".column").appendChild(task);

saveBoard();
}

function saveBoard(){

let data = {
todo: document.getElementById("todo").innerHTML,
progress: document.getElementById("progress").innerHTML,
done: document.getElementById("done").innerHTML
};

localStorage.setItem("kanban", JSON.stringify(data));
}

function loadBoard(){

let data = JSON.parse(localStorage.getItem("kanban"));

if(!data) return;

document.getElementById("todo").innerHTML = data.todo;
document.getElementById("progress").innerHTML = data.progress;
document.getElementById("done").innerHTML = data.done;

document.querySelectorAll(".task").forEach(t=>{
t.draggable = true;
t.ondragstart = drag;
});
}

window.onload = loadBoard;