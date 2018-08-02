var todos = [];
var close = document.getElementsByClassName("close");
var i;

window.onload=function(){
  // Create a "close" button and append it to each list item
  var myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
}

function read_todos(){
  var todos_stored = localStorage.getItem("TodosLocalStorage");
  console.log(todos_stored);
  var todos_list = JSON.parse(todos_stored);
  //console.log(todos_list.length);
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
        var divtxt = div.innerText;
        divtxt = divtxt.substring(0, divtxt.length - 1);
        div.style.display = "none";
        console.log(divtxt);
        delete_from_list(divtxt);
      }
    }
  }

}

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
    // read & add existing items to array
    var todos_stored = localStorage.getItem("TodosLocalStorage");
    var todos_list = JSON.parse(todos_stored);
    console.log(todos_stored);
    if (todos_list === null){
        todos = [];
    } else {
      todos = [];
      for (i=0; i<todos_list.length; i++){
        todos.push(todos_list[i]);
      }
    }
    // Add new input to array
    todos.push(inputValue);
    //console.log(todos);
    var new_todos = JSON.stringify(todos);
    //console.log(new_todos);
    localStorage.setItem("TodosLocalStorage", new_todos);
    //var todos_stored = localStorage.getItem("TodosLocalStorage");
    console.log(todos_stored);
  }
  document.getElementById("myInput").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  
  
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

}

function delete_from_list(divtxt){
  // get current saved to do list
  var todos_stored = localStorage.getItem("TodosLocalStorage");
  console.log(todos_stored);
  var todos_list = JSON.parse(todos_stored);

  // find the index of the clicked item and remove it
  var index = todos_list.indexOf(divtxt);
  console.log(index);
  if (index > -2) {
    todos_list.splice(index,1);
    console.log(todos_list)
  }
  // save the new list in local storage
  var new_todos = JSON.stringify(todos_list);
  console.log(new_todos);
  localStorage.setItem("TodosLocalStorage", new_todos);
  //make invisible on page
  
}
