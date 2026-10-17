const container = document.querySelector(".container");
const add_book_button = document.querySelector("#book-button");
const submit_button = document.querySelector("#submit-btn");
const close_book_button = document.querySelector("#close-btn");
const form_container = document.querySelector(".form-container");

// Retrieve and convert the string back into a JavaScript array
// If nothing is stored yet, fall back to an empty array ([])
let myLibrary = JSON.parse(localStorage.getItem("myBooks")) || [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
    this.id = crypto.randomUUID();
    this.isDisplayed = false;

    this.info = function() {
        console.log(this.title + " by " + this.author + ", " + this.pages + ", " + this.isRead);
    }
}

function addBookToLibrary(title, author, pages, isRead) {
  // take params, create a book then store it in the array
  const book1 = new Book(title, author, pages);
  book1.isRead = isRead;
  myLibrary.push(book1);
}

function renderBooks() {
    for (const book of myLibrary) {

        const card = document.createElement("div");
        const heading = document.createElement("h1");
        const author = document.createElement("h3");
        const pages = document.createElement("p");
        const read_btn = document.createElement("button");
        const remove_btn = document.createElement("button");

        card.classList.add("card");

        heading.textContent = book.title;
        card.appendChild(heading);

        author.textContent = book.author;
        card.appendChild(author);

        pages.textContent = book.pages + "pg";
        card.appendChild(pages);

        read_btn.textContent = "Read";
        read_btn.classList.add("read-card");
        if (!book.isRead) {
            read_btn.classList.add("unread");
        }
        card.appendChild(read_btn);

        read_btn.addEventListener("click", function() {
            if(book.isRead) {
                book.isRead = false;
                read_btn.classList.add("unread");
            }
            else {
                book.isRead = true;
                read_btn.classList.remove("unread");
            }
        });

        remove_btn.textContent = "Remove";
        remove_btn.classList.add("remove-btn");
        remove_btn.setAttribute("id", "remove-btn");
        card.appendChild(remove_btn);

        remove_btn.addEventListener("click", function() {
            card.remove(); // remove from the DOM
            // remove from the array myLibrary
            myLibrary.splice(myLibrary.indexOf(book), 1);
            update_local_storage();
        });

        container.appendChild(card);
    }
}

function open_form() {
    form_container.classList.add("open");
}

function close_form() {
    form_container.classList.remove("open");
}

function update_local_storage() {
    // convert array to an JSON string and save it
    localStorage.setItem("myBooks", JSON.stringify(myLibrary));
    console.log("Updated local storage.")
}

function add_book(event) {
    const title = document.getElementById("book_title").value;
    const author = document.getElementById("author_name").value;
    const pages = document.getElementById("number_of_pages").value;
    const read_checkbox = document.getElementById("read_checkbox").checked;
    console.log("Adding book to library.");
    console.log(title + " by " + author);
    addBookToLibrary(title, author, pages, read_checkbox);
    renderBooks();
    close_form();
    update_local_storage();
}

add_book_button.addEventListener("click", open_form);
close_book_button.addEventListener("click", close_form);
submit_button.addEventListener("click", add_book);

// addBookToLibrary("The Kite Runner", "Khajit", 300, true);
renderBooks();