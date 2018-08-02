var todos = [];
var close = document.getElementsByClassName("close");
var i;



function read_todos(){
  document.getElementById("myInput").value = "";
  var links = document.getElementsByTagName("li");
  console.log(links);
  for (i in _.range(links.length)){
    links[i].onload = function () {
      links.style.display = "none";
    }
  }

  var todos_stored = localStorage.getItem("TodosLocalStorage");
  //console.log(todos_stored);
  var todos_list = JSON.parse(todos_stored);
  //console.log(todos_list);
  //console.log(todos_list[0]);
  if (todos_list === null){
    todos_list=[];
  } else {
    for (i=0 ; i < todos_list.length; i++) {
      var li = document.createElement("li");
      var t = document.createTextNode(todos_list[i]);
      li.appendChild(t);
      document.getElementById("myUL").appendChild(li);
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);
    }
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function(){
        var div = this.parentElement;
        var divtxt_raw = div.innerText;
        divtxt_raw = divtxt_raw.substring(0, divtxt_raw.length - 2);
        div.style.display = "none";
        console.log(divtxt_raw);
        var divtxt_1 = JSON.stringify(divtxt_raw);
        var divtxt = JSON.parse(divtxt_1);
        console.log(divtxt_1);
        console.log(divtxt);
        delete_from_list(divtxt);
      }
    }
  }

}

function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    // read & add existing items to array
    var todos_stored = localStorage.getItem("TodosLocalStorage");
    var todos_list = JSON.parse(todos_stored);
    //console.log(todos_stored);
    if (todos_list === null){
        todos = [];
    } else {
      todos = [];
      for (i in _.range(todos_list.length)){
        todos.push(todos_list[i]);
        console.log(todos);
      }
    }
    // Add new input to array
    todos.push(inputValue);
    console.log(todos);
    var new_todos = JSON.stringify(todos);
    //console.log(new_todos);
    localStorage.setItem("TodosLocalStorage", new_todos);
    //var todos_stored = localStorage.getItem("TodosLocalStorage");
    //console.log(todos_stored);
  }
  read_todos();
}

function delete_from_list(divtxt){
  // get current saved to do list
  var todos_stored = localStorage.getItem("TodosLocalStorage");
  console.log(todos_stored);
  var todos_list = JSON.parse(todos_stored);

  // find the index of the clicked item and remove it
  var index = todos_list.indexOf(divtxt);
  //console.log(todos_list);
  console.log(index);
  if (index != null) {
    todos_list.splice(index,1);
    console.log(todos_list);
  } 
  // save the new list in local storage
  var new_todos = JSON.stringify(todos_list);
  console.log(new_todos);
  localStorage.setItem("TodosLocalStorage", new_todos);
}
