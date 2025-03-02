//TASK 1: Creating a Book Class

class Book {
  constructor(title, author, isbn, copies) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.copies = copies;
  }

  getDetails() {
    return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}, Copies: ${this.copies}`;
  }

  updateCopies(quantity) {
    // Adjust the copies by the quantity (can be positive or negative)
    this.copies += quantity;
  }
}

// --- Test Cases for Task 1 ---
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 123456, 5);
console.log(book1.getDetails());
// Expected: "Title: The Great Gatsby, Author: F. Scott Fitzgerald, ISBN: 123456, Copies: 5"

book1.updateCopies(-1);
console.log(book1.getDetails());
// Expected: "Title: The Great Gatsby, Author: F. Scott Fitzgerald, ISBN: 123456, Copies: 4"

// TASK 2: Creating a Borrower Class

class Borrower {
  constructor(name, borrowerId) {
    this.name = name;
    this.borrowerId = borrowerId;
    this.borrowedBooks = [];
  }

  borrowBook(bookTitle) {
    this.borrowedBooks.push(bookTitle);
  }

  returnBook(bookTitle) {
    const index = this.borrowedBooks.indexOf(bookTitle);
    if (index !== -1) {
      this.borrowedBooks.splice(index, 1);
    }
  }
}

// --- Test Cases for Task 2 ---
const borrower1 = new Borrower("Alice Johnson", 201);
borrower1.borrowBook("The Great Gatsby");
console.log(borrower1.borrowedBooks);
// Expected: ["The Great Gatsby"]

borrower1.returnBook("The Great Gatsby");
console.log(borrower1.borrowedBooks);
// Expected: []


//TASK 3: Creating a Library Class

class Library {
  constructor() {
    this.books = [];      // array of Book instances
    this.borrowers = [];  // array of Borrower instances
  }

  addBook(book) {
    this.books.push(book);
  }

  listBooks() {
    this.books.forEach((bk) => {
      console.log(bk.getDetails());
    });
  }
}

// --- Test Cases for Task 3 ---
// Using 'book1' from Task 1
const library = new Library();
library.addBook(book1);
library.listBooks();
// Expected: "Title: The Great Gatsby, Author: F. Scott Fitzgerald, ISBN: 123456, Copies: 4"


//TASK 4: Implementing Book Borrowing


// We add lendBook(borrowerId, isbn) to the Library class via prototype
Library.prototype.lendBook = function (borrowerId, isbn) {
  // 1. Find the book by ISBN
  const book = this.books.find((b) => b.isbn === isbn);
  // 2. Find the borrower by ID
  const borrower = this.borrowers.find((br) => br.borrowerId === borrowerId);

  if (!book) {
    console.log("Book not found in the library.");
    return;
  }
  if (!borrower) {
    console.log("Borrower not found in the system.");
    return;
  }
  if (book.copies <= 0) {
    console.log("No copies available to lend.");
    return;
  }

  // Reduce the book's copies by 1
  book.updateCopies(-1);
  // Add the book title to the borrower's borrowedBooks
  borrower.borrowBook(book.title);
};

// --- Test Cases for Task 4 ---
// Using 'library' from Task 3 and 'borrower1' from Task 2
library.borrowers.push(borrower1);
library.lendBook(201, 123456);
console.log(book1.getDetails());
// Expected: "Title: The Great Gatsby, Author: F. Scott Fitzgerald, ISBN: 123456, Copies: 3"
console.log(borrower1.borrowedBooks);
// Expected: ["The Great Gatsby"]


