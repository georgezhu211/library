// Libray Module
const Library = (() => {
  const myLibrary = [];

  const add = (book) => {
    myLibrary.push(book);
    DOM.update(book);
    storage.update();
  };

  return {
    myLibrary,
    add,
  };
})();
// Book Class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggle() {
    if (this.read == 'Plan to Read') {
      this.read = 'Reading';
    } else if (this.read == 'Reading') {
      this.read = 'Completed';
    } else {
      this.read = 'Plan to Read';
    }
  }
}
// DOM module
const DOM = (() => {
  // cache DOM
  const bookshelf = document.querySelector('.bookshelf');
  const formPopup = document.querySelector('.form-popup');
  const formBtn = document.querySelector('.form-button');
  const closeBtn = document.querySelector('.close-button');
  const bookForm = document.getElementById('book-form');
  const storageBtn = document.querySelector('.storage-button');

  // bind events
  formBtn.addEventListener('click', openForm);
  closeBtn.addEventListener('click', closeForm);
  bookForm.addEventListener('submit', addBook.bind(this));
  storageBtn.addEventListener('click', clearStorage);

  function render() {
    clear();
    Library.myLibrary.forEach((book) => update(book));
  }

  function update(book) {
    let row = bookshelf.insertRow(-1);
    for (const property in book) {
      row.insertCell().textContent = book[property];
    }
    let options = row.insertCell();
    addEditBtn(options);
    addRemoveBtn(options);
  }

  function openForm() {
    formPopup.style.display = 'block';
  }

  function closeForm() {
    formPopup.style.display = 'none';
  }

  function addBook(e) {
    e.preventDefault();
    let title = bookForm.elements.title.value;
    let author = bookForm.elements.author.value;
    let pages = bookForm.elements.pages.value;
    let readIndex = bookForm.elements.read.selectedIndex;
    let read = bookForm.elements.read.options[readIndex].value;
    let book = new Book(title, author, pages, read);
    Library.add(book);
    bookForm.reset();
    closeForm();
  }

  function editBook() {
    const row = this.parentElement.parentElement;
    const index = row.rowIndex - 1;
    Library.myLibrary[index].toggle();
    render();
  }

  function removeBook() {
    const row = this.parentElement.parentElement;
    const index = row.rowIndex - 1;
    Library.myLibrary.splice(index, 1);
    row.remove();
  }

  function addEditBtn(row) {
    const button = document.createElement('button');
    button.addEventListener('click', editBook);
    button.className = 'edit-button';
    const span = document.createElement('span');
    span.className = 'material-icons';
    span.textContent = 'edit';
    button.appendChild(span);
    row.appendChild(button);
  }

  function addRemoveBtn(row) {
    const button = document.createElement('button');
    button.addEventListener('click', removeBook);
    button.className = 'remove-button';
    const span = document.createElement('span');
    span.className = 'material-icons';
    span.textContent = 'close';
    button.appendChild(span);
    row.appendChild(button);
  }

  function clearStorage() {
    console.log('local storage cleared');
    localStorage.clear();
    clear();
  }

  function clear() {
    while (bookshelf.firstChild) {
      bookshelf.removeChild(bookshelf.firstChild);
    }
  }

  return {
    update,
    clear,
  };
})();

const storage = (() => {
  function activate() {
    if (!localStorage['myLibrary']) {
      update();
    } else {
      access();
    }
  }

  function update() {
    console.log('updating local storage');
    const libraryData = Library.myLibrary;
    localStorage['myLibrary'] = JSON.stringify(libraryData);
  }

  function access() {
    console.log('accessing local storage');
    const libraryData = JSON.parse(localStorage['myLibrary']);
    libraryData.forEach((obj) => {
      const book = unserialize(obj);
      Library.add(book);
    });
  }

  function unserialize(obj) {
    let title = obj.title;
    let author = obj.author;
    let pages = obj.pages;
    let read = obj.read;
    return new Book(title, author, pages, read);
  }

  return {
    activate,
    update,
  };
})();

storage.activate();
