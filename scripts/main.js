// Libray Module
const Library = (() => {
  const myLibrary = []

  const add = book => {
    myLibrary.push(book)
    DOM.update(book)
  }

  return {
    myLibrary,
    add
  }
})();
// Book Class
class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
}
// DOM module
const DOM = (() => {
  // cache DOM
  const table = document.querySelector('.bookshelf')
  const formPopup = document.querySelector('.form-popup')
  const formBtn = document.querySelector('.form-button')
  const closeBtn = document.querySelector('.close-button')
  const bookForm = document.getElementById('book-form')
  // bind events
  formBtn.addEventListener('click', openForm)
  closeBtn.addEventListener('click', closeForm)
  bookForm.addEventListener('submit', addBook.bind(this))

  const render = library => {
    library.forEach(book => update(book))
  }

  const update = book => {
    let row = table.insertRow(-1)
    for (const property in book) {
      row.insertCell().textContent = book[property]
    }
  }

  function openForm() {
    formPopup.style.display = 'block'
  }

  function closeForm() {
    formPopup.style.display = 'none'
  }

  function addBook(e) {
    e.preventDefault()
    let title = bookForm.elements.title.value
    let author = bookForm.elements.author.value
    let pages = bookForm.elements.pages.value
    let read = bookForm.elements.read.value
    let book = new Book(title, author, pages, read)
    Library.add(book)
    bookForm.reset()
    closeForm()
  }

  return {
    render,
    update,
  }
})();


const manga1 = new Book('naruto', 'kishimoto', 122, true)
const manga2 = new Book('sao', 'kawahara', 122, true)
const manga3 = new Book('one piece', 'oda', 122, true)
const manga4 = new Book('attack on titan', 'idk', 122, true)

Library.add(manga1)
Library.add(manga2)
Library.add(manga3)


