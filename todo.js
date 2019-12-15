const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

var TODO_LS = '';//localStorage


var toDos = [];

function deleteToDo(event){
    const btn = event.target ;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    var cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; 
    saveToDos();
}

function saveToDos(){ //localStorage에 저장하는 함수
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delBtn.innerText = "😎";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId ;
    toDoList.appendChild(li);//ul에다 li더해줌
    const toDoObj = {
        text : text,
        id: newId
    };
    toDos.push(toDoObj); // toDos array에 객체 넣어줌
    saveToDos();//localStorage에 저장
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    var loadedToDos = localStorage.getItem(TODO_LS);
    if(loadedToDos !== null){
        var parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();