var todos = [];
var close = document.getElementsByClassName("close");
var i;

function read_todos(){
  // clear the add new text field
  document.getElementById("myInput").value = "";

  // get currently saved to do items from local storage
  var todos_stored = localStorage.getItem("TodosLocalStorage");
  var todos_list = JSON.parse(todos_stored);
  
  // check if the list is empty
  if (todos_list === null){
    todos_list=[];
  } else {
    // create li elements in myUL to display stored to do items
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
    // append a close button to each li element
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function(){
        // make the clicked entry invisible
        var div = this.parentElement;
        div.style.display = "none";
        // get the clicked entry's content, remove the 'x', stringify to add " " and parse back
        var divtxt_raw = div.innerText;
        divtxt_raw = divtxt_raw.substring(0, divtxt_raw.length - 1);
        var divtxt_1 = JSON.stringify(divtxt_raw);
        var divtxt = JSON.parse(divtxt_1);
         // remove clicked entry from stored items using parsed entry to find index
        delete_from_list(divtxt);
      }
    }
  }

}

function newElement() {
  // read input and check if it is empty
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    // read & add existing items to array
    var todos_stored = localStorage.getItem("TodosLocalStorage");
    var todos_list = JSON.parse(todos_stored);
    if (todos_list === null){
        todos = [];
    } else {
      todos = [];
      for (i in _.range(todos_list.length)){
        todos.push(todos_list[i]);
      }
    }
    // Add new input to array
    todos.push(inputValue);
    var new_todos = JSON.stringify(todos);
    localStorage.setItem("TodosLocalStorage", new_todos);
  }
  // clear the current list of todo items
  var links_container = document.getElementById("myUL");
  links_container.innerHTML = '';
  // display the current list of to do items
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
