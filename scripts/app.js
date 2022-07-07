// Initialize variables to add books to localStorage
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const addBookBtn = document.querySelector('.add-book');

// Event to add a book to local storage
addBookBtn.addEventListener("click", addBook);
function addBook() {
  if (!bookTitle.value || !bookAuthor.value) return;
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const book = {};
  book.title = bookTitle.value;
  book.author = bookAuthor.value;
  book.index = books.length;
  books.push(book);
  
  localStorage.setItem("books", JSON.stringify(books));
  bookTitle.value = "";
  bookAuthor.value = "";
  displayBooks();
}
