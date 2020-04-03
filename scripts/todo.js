let todos = []
const close = document.getElementsByClassName('close')
const inputAddNew = document.getElementById('myInput')
const lblTodoList = document.getElementById('myUL')
let i

function clearAddNew(){
  inputAddNew.value = ''
}

function clearTodoListDisplay(){
  lblTodoList.innerHTML = ''
}
function readTodos(){
  // clear the add new text field
  clearAddNew()
  clearTodoListDisplay()

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
      lblTodoList.appendChild(li)
      let span = document.createElement('SPAN')
      let txt = document.createTextNode('\u00D7')
      span.className = 'close'
      span.appendChild(txt)
      li.appendChild(span)
    }
    // append a close button to each li element
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function(){
        const div = this.parentElement
        // make the clicked entry invisible
        div.style.display = 'none'
        // get the clicked entry's content, remove the 'x', stringify to add ' ' and parse back
        let rawDivText = div.innerText
        rawDivText = rawDivText.substring(0, rawDivText.length - 1)
        //let divtxt_1 = JSON.stringify(rawDivText)
        let divText = JSON.parse(JSON.stringify(rawDivText))
         // remove clicked entry from stored items using parsed entry to find index
        deleteFromList(divText)
      }
    }
  }
}

function newElement() {
  // read input and check if it is empty
  const inputValue = inputAddNew.value
  if (inputValue === '') {
    alert('You must write something!')
  } else {
    // read & add existing items to array
    const storedTodos = localStorage.getItem('TodosLocalStorage')
    let todosList = JSON.parse(storedTodos)
    todos = []
    if (todosList != null){
      for (i in _.range(todosList.length)){
        todos.push(todosList[i])
      }
    }
    // Add new input to array
    todos.push(inputValue)
    localStorage.setItem('TodosLocalStorage', JSON.stringify(todos))
  }
  // clear the current list of todo items
  // display the current list of to do items
  clearTodoListDisplay()
  readTodos()
}

function deleteFromList(entry){
  // get current saved to do list
  const storedTodos = localStorage.getItem('TodosLocalStorage')
  let todosList = JSON.parse(storedTodos)

  // find the index of the clicked item and remove it
  const index = todosList.indexOf(entry)
  console.log(index)
  if (index != null) {
    todosList.splice(index,1)
  } 
  // save the new list in local storage
  localStorage.setItem('TodosLocalStorage', JSON.stringify(todosList))
}
