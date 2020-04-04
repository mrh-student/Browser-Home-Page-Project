const close = document.getElementsByClassName('close')
const inputAddNew = document.getElementById('myInput')
const lblTodoList = document.getElementById('myUL')
const list = document.querySelector('ul')
const btnDel = document.getElementById('delAll')
let i

btnDel.addEventListener('click', function(){
  deleteStoredTodos()
  readTodos()
  btnDel.hidden = true
})

lblTodoList.addEventListener('click', function(e) {
  let todoText = e.target.innerText.substring(0,e.target.innerText.length - 2)
  let storedTodos = getStoredTodos()
  let todoEntryIndex = storedTodos.indexOf(findTodoEntry(storedTodos, todoText))

  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked')
    if(storedTodos[todoEntryIndex].completed == true){
      storedTodos[todoEntryIndex].completed = false
    } else {
      storedTodos[todoEntryIndex].completed = true
    }
    localStorage.setItem('TodosLocalStorage', JSON.stringify(storedTodos))
  }
  console.log(storedTodos)
})

function readTodos(){
  clearAddNew()
  clearTodoListDisplay()
  
  // get currently saved to do items from local storage
  let storedTodos = getStoredTodos()
  
  if (storedTodos.length > 0){
    btnDel.hidden = false
    // create li elements in myUL to display stored to do items
    for (i=0 ; i < storedTodos.length; i++) {
      let li = document.createElement('li')
      let t = document.createTextNode(storedTodos[i].text)
      let span = document.createElement('SPAN')
      let txt = document.createTextNode('\u00D7')
      span.className = 'close'
      if(storedTodos[i].completed == true){
        li.className = 'checked'
      }
      span.appendChild(txt)
      li.appendChild(t)
      li.appendChild(span)
      lblTodoList.appendChild(li)
    }
    // append a close button to each li element
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function(){
        storedTodos = getStoredTodos()
        const liElement = this.parentElement
        let liElementText = liElement.innerText
        liElementText = liElementText.substring(0, liElementText.length - 2)
        const todoEntryIndex = storedTodos.indexOf(findTodoEntry(storedTodos, liElementText))
        // make the clicked entry invisible
        liElement.style.display = 'none'
        // remove clicked entry from stored items
        deleteFromList(todoEntryIndex)
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
    let storedTodos = getStoredTodos()
    let newTodo = {
      text: inputValue,
      completed: false
    }
    // Add new input to array
    storedTodos.push(newTodo)
    localStorage.setItem('TodosLocalStorage', JSON.stringify(storedTodos))
  }
  // clear the current list of todo items
  // display the current list of to do items
  clearAddNew()
  clearTodoListDisplay()
  readTodos()
}

function deleteFromList(entryIndex){
  // get current saved to do list
  let storedTodos = getStoredTodos()
  storedTodos.splice(entryIndex,1)
  // save the new list in local storage
  localStorage.setItem('TodosLocalStorage', JSON.stringify(storedTodos))
  if(storedTodos.length < 1){
  btnDel.hidden = true
  }
}

function deleteStoredTodos(){
  localStorage.setItem('TodosLocalStorage', JSON.stringify([]))
}

function getStoredTodos(){
  return JSON.parse(localStorage.getItem('TodosLocalStorage'))
}

function clearAddNew(){
  inputAddNew.value = ''
}

function clearTodoListDisplay(){
  lblTodoList.innerHTML = ''
}

function findTodoEntry(array, string){
  for (i=0; i < array.length; i++) {
    if (array[i].text === string) {
        return array[i];
    }
  }
}