// Initialize variables to add books to localStorage
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const addBookBtn = document.querySelector('.add-book');

// Initilise books list
const booksList = document.querySelector('.books-list');

// Event to display books
window.addEventListener('load', booksList);

// Function to display books
function displayBooks() {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  if (!books) return;
  booksList.innerHTML = '';
  books.forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    const titleElement = document.createElement('h4');
    titleElement.innerText = book.title;
    const authorElement = document.createElement('h4');
    authorElement.innerText = book.author;
    const removeElement = document.createElement('button');
    removeElement.classList.add('remove-btn');
    removeElement.innerText = 'Remove';
    removeElement.setAttribute('data-id', book.index);

    // Create Horizontal element
    const horizontalElement = document.createElement('hr');
    bookDiv.appendChild(titleElement);
    bookDiv.appendChild(authorElement);
    bookDiv.appendChild(removeElement);
    bookDiv.appendChild(horizontalElement);
    booksList.appendChild(bookDiv);
  });
}

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
addBookBtn.addEventListener('click', addBook);

// Event to remove a book
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
booksList.addEventListener('click', removeBook);
