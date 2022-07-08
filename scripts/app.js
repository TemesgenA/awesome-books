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

// Class to display books
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    // create book Div
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    // Create title
    const titleElement = document.createElement('h3');
    titleElement.innerText = book.title;

    // create Author
    const authorElement = document.createElement('h3');
    authorElement.innerText = book.author;

    // Create Remove Btn
    const removeElement = document.createElement('button');
    removeElement.classList.add('remove-btn');
    removeElement.innerText = 'Remove';
    removeElement.setAttribute('data-id', book.index);

    // Create infoDiv element
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    // create h3
    const linkElement = document.createElement('h3');
    linkElement.innerText = 'by';

    infoDiv.appendChild(titleElement);
    infoDiv.appendChild(linkElement);
    infoDiv.appendChild(authorElement);

    bookDiv.appendChild(infoDiv);
    booksList.appendChild(bookDiv);
    bookDiv.appendChild(removeElement);
  }

  static clearFields() {
    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
  }

  static deleteBook(el) {
    if (el.classList.contains('remove-btn')) {
      el.parentElement.remove();
    }
  }
}

// Class to handle local storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert("Book Added", "success");

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert("Book Removed", "success");
});
