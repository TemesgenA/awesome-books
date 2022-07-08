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
