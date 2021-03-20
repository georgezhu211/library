let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.readStatus = false
}

Book.prototype.toggleRead = function() {
  if(this.readStatus == false) {
    this.read = 'not yet read'
    this.readStatus = true
  } else {
    this.read = 'completed'
    this.readStatus = false
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read)
  myLibrary.push(book)
}

function displayAllBooks() {
  let bookshelf = document.getElementById('bookshelf')
  bookshelf.innerHTML = '';
  for(let i=0; i<myLibrary.length; i++) {
    let book = bookshelf.insertRow(-1)
    book.insertCell(0).innerHTML = myLibrary[i].title
    book.insertCell(1).innerHTML = myLibrary[i].author
    book.insertCell(2).innerHTML = myLibrary[i].pages
    book.insertCell(3).innerHTML = myLibrary[i].read
    let options = book.insertCell(4)
    options.appendChild(createRemoveBtn(i))
    options.appendChild(createReadBtn(i))
  }
  addRemoveButtons()
  addReadButtons()
}

function createRemoveBtn(index) {
  let button = document.createElement('BUTTON')
  button.className = 'remove-button'
  button.innerHTML = '&#10005'
  button.setAttribute('data-index', `${index}`)
  return button
} 

function createReadBtn(index) {
  let button = document.createElement('BUTTON')
  button.className =  'read-button'
  button.innerHTML = 'R'
  button.setAttribute('data-index', `${index}`)
  return button
}

function cleanForm() {
  formPopup.style.display = 'none'
  let inputs = document.querySelectorAll('input')
  inputs.forEach((e) => {
    e.value = ''
  })
}

addBookToLibrary('book1', 'asdf', 123, '123')
addBookToLibrary('book2', 'asdf', 123, '123')
addBookToLibrary('book3', 'asdf', 123, '123')
displayAllBooks()


const newBtn = document.querySelector('.new-button')
const closeBtn = document.querySelector('.close-button')
const addBtn = document.querySelector('.add-button')
const formPopup = document.querySelector('.form-popup')



newBtn.addEventListener('click', () => {
  formPopup.style.display = 'block'
})

closeBtn.addEventListener('click', cleanForm)

addBtn.addEventListener('click', () => {
  let title = document.querySelector("input[name='title']").value
  let author = document.querySelector("input[name='author']").value
  let pages = document.querySelector("input[name='pages']").value
  let read = document.querySelector("input[name='read']").value
  addBookToLibrary(title, author, pages, read)
  displayAllBooks()
  cleanForm()
})

function addRemoveButtons() {
  const removeBtns = document.querySelectorAll('.remove-button')
  
  removeBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      let index = e.target.dataset.index
      if(index >= myLibrary.length) {
        return
      }
      myLibrary.splice(Number(index), 1)
      displayAllBooks()
    })
  })
}

function addReadButtons() {
  const readBtns = document.querySelectorAll('.read-button')

  readBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      let index = e.target.dataset.index
      myLibrary[index].toggleRead()
      displayAllBooks()
    })
  })
}