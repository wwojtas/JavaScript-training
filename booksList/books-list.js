window.onload = function() {
console.log("App started");
booksList.init();
}

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.id = Date.now(); //timestamp
    }
}

class BooksList {
    constructor() {
        this.books = [];
    }

    init() {
        document.getElementById("saveButton").addEventListener("click", (e) => this.saveButton(e) );
        this.loadDataFromStorage();
    }

    loadDataFromStorage() {
        const data = storage.getItems();
        if(!data) return;
        
        this.books = data;
        data.forEach( (value, index) => {
            ui.addBookToTable(value);
        } )
    }

    saveButton(e) {
        console.log("save button");
        
        const author = document.getElementById("bookAuthor").value;
        const title = document.getElementById("bookTitle").value;

        if(!author || !title) {
            console.log("blank data");
            return;
        }
        // if fields are blank, return below, then bootstrap validation
        //preventDefault not load
        e.preventDefault();
     
        const book = new Book(title, author);
        this.addBook(book);
    }

    addBook(book) {
        this.books.push(book);
        ui.addBookToTable(book);
        this.saveData()
    }

    removeBookById(bookId) {
       this.books.forEach((el,index) => {
        if(el.id == bookId) this.books.splice(index, 1);
       } );
       this.saveData();
    }

    moveBookUp(bookId) {
        let arr = this.books;
        for(let a = 0; a < arr.length; a++) {
            let el = arr[a];
            if(el.id == bookId) {
                if(a >= 1) {
                    let temp = arr[a-1];
                    arr[a-1] = arr[a];
                    arr[a] = temp;
                    break;
                }
            }
        }
        this.saveData();
        ui.deleteAllBookRows();
        this.loadDataFromStorage();
    }

    moveBookDown(bookId) {
        let arr = this.books;
        for(let a = 0; a < arr.length; a++) {
            let el = arr[a];
            if(el.id == bookId) {
                if(a <= arr.length - 2) {
                    let temp = arr[a+1];
                    arr[a+1] = arr[a];
                    arr[a] = temp;
                    break;
                }
            }
        }
        this.saveData();
        ui.deleteAllBookRows();
        this.loadDataFromStorage();

    }

    saveData() {
        storage.saveItems(this.books);
    }
}

const booksList = new BooksList();

class Ui {

    deleteBook(e) {
        const bookId = e.target.getAttribute("data-book-id");
        e.target.parentElement.parentElement.remove(); //cały wiersz wykasowany
        booksList.removeBookById(bookId);
    }

    deleteAllBookRows() {
        const tbodyRows = document.querySelectorAll("#booksTable tbody tr");

        tbodyRows.forEach(function(el) {
            el.remove();
        });
    }

    addBookToTable(book) {
        const tbody = document.querySelector("#booksTable tbody");
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td> ${book.title} </td> 
        <td> ${book.author} </td> 
        <td>
            <button type="button" data-book-id="${book.id}"         class="btn btn-danger btn-sm delete">Skasuj</button>
            <button type="button" data-book-id="${book.id}" class="btn btn-secondary btn-sm up-arrow">▲</button>
            <button type="button" data-book-id="${book.id}" class="btn btn-secondary btn-sm down-arrow">▼</button>
        </td> 
        `;

        tbody.appendChild(tr);
        
        let deleteButton = document.querySelector(`button.delete[data-book-id='${book.id}']`);
        deleteButton.addEventListener("click", (e) => this.deleteBook(e));

        let upButton = document.querySelector(`button.up-arrow[data-book-id='${book.id}']`);
        upButton.addEventListener("click", (e) => this.arrowUp(e));

        let downButton = document.querySelector(`button.down-arrow[data-book-id='${book.id}']`);
        downButton.addEventListener("click", (e) => this.arrowDown(e));

        this.clearForm();
    }

    arrowUp(e) {
        let bookId = e.target.getAttribute("data-book-id");
        console.log("up", bookId);
        booksList.moveBookUp(bookId);

    }
    arrowDown(e) {
        let bookId = e.target.getAttribute("data-book-id");
        console.log("down", bookId);
        booksList.moveBookDown(bookId);
    }

    clearForm() {
        document.getElementById("bookTitle").value = "";
        document.getElementById("bookAuthor").value = "";
        document.getElementById("bookForm").classList.remove("was-validated");
    }
}

const ui = new Ui();

class Storage {

    getItems() {
        let books = null;
        if(localStorage.getItem("books") !== null) {
            books = JSON.parse(localStorage.getItem("books"));
        } else {
            books = [];
            
        }
        return books;
    }
    saveItems(books) {
        localStorage.setItem("books", JSON.stringify(books));
    }
}

const storage = new Storage();


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()




