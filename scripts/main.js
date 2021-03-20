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

function addBookToLibrary() {
  let title = prompt("Please enter the name of the book: ")
  let author = prompt("Please enter the name of the author: ")
  let pages = prompt("Please enter the number of pages: ")
  let read = prompt("Have you read the book? ")
  const book = new Book(title, author, pages, read)
  myLibrary.push(book);
}

function displayLibrary() {
  console.table(myLibrary);
}

