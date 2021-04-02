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
  constructor(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
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

  const update = book => {
    let row = table.insertRow(-1)
    for (const property in book) {
      row.insertCell().textContent = book[property]
    }
    addReadSelect(row)
    addRemoveBtn(row)
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

  function removeBook() {
    const row = this.parentElement.parentElement
    const index = row.rowIndex - 1;
    Library.myLibrary.splice(index, 1)
    row.remove()
  }

  function addReadSelect(row) {
    const select = document.createElement('select')
    select.className = 'read-selector'
    const option1 = document.createElement('option')
    option1.textContent = 'Plan to Read'
    const option2 = document.createElement('option')
    option2.textContent = 'Reading'
    const option3 = document.createElement('option')
    option3.textContent = 'Completed'
    select.appendChild(option1)
    select.appendChild(option2)
    select.appendChild(option3)
    row.insertCell().appendChild(select)
  }

  function addRemoveBtn(row) {
    const button = document.createElement('button')
    button.addEventListener('click', removeBook)
    button.className = 'remove-button'
    button.textContent = 'X'
    row.insertCell().appendChild(button)
  }

  return {
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
