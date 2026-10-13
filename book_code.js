const container = document.querySelector(".container")

const myLibrary = []

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
    this.id = crypto.randomUUID();

    this.info = function() {
        console.log(this.title + " by " + this.author + ", " + this.pages + ", " + this.isRead);
    }
}

function addBookToLibrary(title, author, pages) {
  // take params, create a book then store it in the array
  const book1 = new Book(title, author, pages);
  myLibrary.push(book1);
}

function displayBooks() {
    for (const book of myLibrary) {
        console.log(book.title + "\n");

        const card = document.createElement("div");
        card.classList.add("card");

        const heading = document.createElement("h1");
        heading.textContent = book.title;
        card.appendChild(heading);

        const author = document.createElement("h3");
        author.textContent = book.author;
        card.appendChild(author);

        const pages = document.createElement("p");
        pages.textContent = book.pages + "pg";
        card.appendChild(pages);

        const read_div = document.createElement("div");
        read_div.textContent = "Read";
        read_div.classList.add("read-card");
        card.appendChild(read_div);

        const remove_btn = document.createElement("button");
        remove_btn.textContent = "Remove";
        remove_btn.classList.add("remove-btn");
        card.appendChild(remove_btn);

        container.appendChild(card);
    }
}

addBookToLibrary("The Kite Runner", "Khajit", 300);
addBookToLibrary("Quantum Mechanics", "Bohr", 255);
displayBooks();