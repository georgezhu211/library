let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
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
  }
}

function cleanForm() {
  formPopup.style.display = 'none'
  let inputs = document.querySelectorAll('input')
  inputs.forEach((e) => {
    e.value = ''
  })
}

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