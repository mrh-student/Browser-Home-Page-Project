let todos = []
const close = document.getElementsByClassName('close')
let i

function readTodos(){
  // clear the add new text field
  document.getElementById('myInput').value = ''
  document.getElementById('myUL').innerHTML = ''

  // get currently saved to do items from local storage
  const storedTodos = localStorage.getItem('TodosLocalStorage')
  let todosList = JSON.parse(storedTodos)
  
  // check if the list is empty
  if (todosList === null){
    todos=[]
  } else {
    // create li elements in myUL to display stored to do items
    for (i=0 ; i < todosList.length; i++) {
      let li = document.createElement('li')
      let t = document.createTextNode(todosList[i])
      li.appendChild(t)
      document.getElementById('myUL').appendChild(li)
      let span = document.createElement('SPAN')
      let txt = document.createTextNode('\u00D7')
      span.className = 'close'
      span.appendChild(txt)
      li.appendChild(span)
    }
    // append a close button to each li element
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function(){
        // make the clicked entry invisible
        let div = this.parentElement
        div.style.display = 'none'
        // get the clicked entry's content, remove the 'x', stringify to add ' ' and parse back
        let divtxt_raw = div.innerText
        divtxt_raw = divtxt_raw.substring(0, divtxt_raw.length - 1)
        let divtxt_1 = JSON.stringify(divtxt_raw)
        let divtxt = JSON.parse(divtxt_1)
         // remove clicked entry from stored items using parsed entry to find index
        deleteFromList(divtxt)
      }
    }
  }

}

function newElement() {
  // read input and check if it is empty
  var inputValue = document.getElementById('myInput').value
  if (inputValue === '') {
    alert('You must write something!')
  } else {
    // read & add existing items to array
    var storedTodos = localStorage.getItem('TodosLocalStorage')
    var todosList = JSON.parse(storedTodos)
    if (todosList === null){
        todos = []
    } else {
      todos = []
      for (i in _.range(todosList.length)){
        todos.push(todosList[i])
      }
    }
    // Add new input to array
    todos.push(inputValue)
    var new_todos = JSON.stringify(todos)
    localStorage.setItem('TodosLocalStorage', new_todos)
  }
  // clear the current list of todo items
  document.getElementById('myUL').innerHTML = ''
  // display the current list of to do items
  readTodos()
}

function deleteFromList(divtxt){
  // get current saved to do list
  var storedTodos = localStorage.getItem('TodosLocalStorage')
  console.log(storedTodos)
  var todosList = JSON.parse(storedTodos)

  // find the index of the clicked item and remove it
  var index = todosList.indexOf(divtxt)
  console.log(index)
  if (index != null) {
    todosList.splice(index,1)
    console.log(todosList)
  } 
  // save the new list in local storage
  var new_todos = JSON.stringify(todosList)
  console.log(new_todos)
  localStorage.setItem('TodosLocalStorage', new_todos)
}
