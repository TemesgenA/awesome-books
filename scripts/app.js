// Initialize variables to add books to local Storage
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const addBookBtn = document.querySelector('.add-book');

// Initilise books list
const booksList = document.querySelector('.books-list');

// Class to Represent a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Function to display books
function displayBooks() {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  if (!books) return;
  booksList.innerHTML = '';
  books.forEach((book) => {
    const displayBooksDiv = document.createElement('div');
    displayBooksDiv.classList.add('book');
    const bookTitleHeading = document.createElement('h4');
    bookTitleHeading.innerText = book.title;
    const bookAuthorHeading = document.createElement('h4');
    bookAuthorHeading.innerText = book.author;
    const bookRemoveBtn = document.createElement('button');
    bookRemoveBtn.classList.add('remove-btn');
    bookRemoveBtn.innerText = 'Remove';
    bookRemoveBtn.setAttribute('data-id', book.index);

    // Add hr element under list book
    const dividingLine = document.createElement('hr');
    displayBooksDiv.appendChild(bookTitleHeading);
    displayBooksDiv.appendChild(bookAuthorHeading);
    displayBooksDiv.appendChild(bookRemoveBtn);
    displayBooksDiv.appendChild(dividingLine);
    booksList.appendChild(displayBooksDiv);
  });
}
// Event to display books
window.addEventListener('DOMContentLoaded', displayBooks);

// Event to add a book to local storage
function addBook() {
  if (!bookTitle.value || !bookAuthor.value) return;
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const book = {};
  book.title = bookTitle.value;
  book.author = bookAuthor.value;
  book.index = books.length;
  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
  bookTitle.value = '';
  bookAuthor.value = '';
  displayBooks();
}

// Event to add books
addBookBtn.addEventListener('click', addBook);

// Function to remove a book
function removeBook(e) {
  const item = e.target;
  if (item.classList[0] === 'remove-btn') {
    const books = JSON.parse(localStorage.getItem('books'));
    const indexInd = Number(item.dataset.id);
    const modified = books.filter((book) => book.index !== indexInd);
    localStorage.setItem('books', JSON.stringify(modified));
  }
  displayBooks();
}

// Event to remove a book
booksList.addEventListener('click', removeBook);
