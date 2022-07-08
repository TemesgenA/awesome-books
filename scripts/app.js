// Initialize variables to add books to local Storage
const addBookBtn = document.querySelector(".add-book-btn");
const booksList = document.querySelector(".books-list");

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
    const displayBooksDiv = document.createElement("div");
    displayBooksDiv.classList.add("book");
    const bookTitleHeading = document.createElement("h4");
    bookTitleHeading.innerText = book.title;
    const bookAuthorHeading = document.createElement("h4");
    bookAuthorHeading.innerText = book.author;
    const bookRemoveBtn = document.createElement("button");
    bookRemoveBtn.classList.add("remove-btn");
    bookRemoveBtn.innerText = "Remove";
    bookRemoveBtn.setAttribute("data-id", book.index);
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");
    const linkElement = document.createElement("h4");
    linkElement.innerText = "by";
    infoDiv.appendChild(bookTitleHeading);
    infoDiv.appendChild(linkElement);
    infoDiv.appendChild(bookAuthorHeading);
    displayBooksDiv.appendChild(infoDiv);
    booksList.appendChild(displayBooksDiv);
    displayBooksDiv.appendChild(bookRemoveBtn);
  }

  static clearFields() {
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
  }

  static deleteBook(el) {
    if (el.classList.contains("remove-btn")) {
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

  static removeBook(author) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event to display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event to add books
addBookBtn.addEventListener('click', () => {
  const bookTitle = document.querySelector('#book-title').value;
  const bookAuthor = document.querySelector('#book-author').value;
  if (bookTitle && bookAuthor) {
    const book = new Book(bookTitle, bookAuthor);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearFields();
  }
});
// Event to remove books
booksList.addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  console.log(e.target.previousElementSibling.children[2]);
  Store.removeBook(e.target.previousElementSibling.children[2].textContent);
});
