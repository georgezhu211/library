// Libray Module
const Library = (() => {
  const myLibrary = []

  const add = book => {
    myLibrary.push(book)
    DOM.update(book)
    storage.update()
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
  const bookshelf = document.querySelector('.bookshelf')
  const formPopup = document.querySelector('.form-popup')
  const formBtn = document.querySelector('.form-button')
  const closeBtn = document.querySelector('.close-button')
  const bookForm = document.getElementById('book-form')
  const storageBtn = document.querySelector('.storage-button')

  // bind events
  formBtn.addEventListener('click', openForm)
  closeBtn.addEventListener('click', closeForm)
  bookForm.addEventListener('submit', addBook.bind(this))
  storageBtn.addEventListener('click', clearStorage)

  const update = book => {
    let row = bookshelf.insertRow(-1)
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

  function clearStorage() {
    console.log('local storage cleared')
    localStorage.clear()
    clear()
  }

  function clear() {
    while(bookshelf.firstChild) {
      bookshelf.removeChild(bookshelf.firstChild)
    }
  }

  return {
    update,
    clear
  }
})();

const storage = (() => {
  function activate() {
    if(!localStorage['myLibrary']) {
      update()
    } else {
      access()
    }
  }

  function update() {
    console.log('updating local storage')
    const libraryData = Library.myLibrary
    localStorage['myLibrary'] = JSON.stringify(libraryData)
  }

  function access() {
    console.log('accessing local storage')
    const libraryData = JSON.parse(localStorage['myLibrary'])
    for (const key in libraryData) {
      const book = libraryData[key]
      Library.add(book)
    }
  }

  return {
    activate,
    update,
  }
})();

storage.activate()