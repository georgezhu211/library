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
  for(let i=0; i<myLibrary.length; i++) {
    let book = bookshelf.insertRow(-1)
    book.insertCell(0).innerHTML = myLibrary[i].title
    book.insertCell(1).innerHTML = myLibrary[i].author
    book.insertCell(2).innerHTML = myLibrary[i].pages
    book.insertCell(3).innerHTML = myLibrary[i].read
  }
}


addBookToLibrary('Book1', 'author1', 123, 'read')
addBookToLibrary('Book2', 'author2', 123, 'not read')
addBookToLibrary('Book3', 'author3', 123, 'read')

displayAllBooks()

const newBtn = document.querySelector('.new-button')
const closeBtn = document.querySelector('.close-button')
const addBtn = document.querySelector('.add-button')
const form = document.querySelector('.form-popup')

newBtn.addEventListener('click', () => {
  form.style.display = 'block'
})

closeBtn.addEventListener('click', () => {
  form.style.display = 'none'
})

addBtn.addEventListener('click', () => {

})