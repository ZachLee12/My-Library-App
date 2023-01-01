// MODAL
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

//Library 
let myLibrary = []

function Book(name, author, pages, readFinished, id) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readFinished = readFinished;
    this.id = id;
}

let bookId = 0;
function addBookToLibrary(name, author, pages, readFinished) {
    const newBook = new Book(name, author, pages, readFinished, bookId);
    myLibrary.push(newBook);
    bookId++;
    console.log(newBook)
}

addBookToLibrary('Garden of Oz', 'Zach', 100, false);
addBookToLibrary('Robot Rocks', 'Luuk', 235, true);
addBookToLibrary('AI is cool', 'Lea', 400, true);
addBookToLibrary('Luzern is good', 'Greta', 664, false);
addBookToLibrary('Dreams', 'Daylan', 245, true);

function addRemoveFunction(btn) {
    btn.addEventListener("click", (e) => {
        e.target.parentElement.remove(); //remove from HTML
        myLibrary = deleteBookFromLibrary(myLibrary, e.target.parentElement.id) //delete from myLibrary
        console.table(myLibrary)
    })
}


function deleteBookFromLibrary(library, id) {
    return library.filter(book => book.id !== parseInt(id));
}


let bookDisplay = document.querySelector(".books")
function displayBook(book) {
    let bookName = document.createElement("p");
    bookName.innerText = `"${book.name}"`;
    let bookAuthor = document.createElement("p");
    bookAuthor.innerText = book.author;
    let bookPages = document.createElement("p");
    bookPages.innerText = book.pages + ' pages';
    let removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-btn");
    addRemoveFunction(removeBtn)

    //toggle container
    let toggleBtnContainer = document.createElement("div")
    toggleBtnContainer.classList.add("toggle-btn-container")
    //checkbox
    let toggleReadBtn = document.createElement("input")
    toggleReadBtn.type = "checkbox"
    toggleReadBtn.id = `toggle-read-${book.id}`
    book.readFinished ? toggleReadBtn.checked = true : toggleReadBtn.checked = false;
    //label
    let toggleReadLabel = document.createElement("label")
    let labelSpan = document.createElement('span')
    labelSpan.innerText = 'I have read this'
    toggleReadLabel.append(toggleReadBtn)
    toggleReadLabel.append(labelSpan)
    toggleReadLabel.htmlFor = `toggle-read-${book.id}`
    toggleBtnContainer.append(toggleReadLabel)
    // toggleBtnContainer.append(toggleReadBtn,toggleReadLabel)

    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book")
    bookDiv.id = book.id; //add bookId to element
    bookDiv.append(bookName, bookAuthor, bookPages, removeBtn, toggleBtnContainer)
    bookDisplay.append(bookDiv)
}
myLibrary.forEach((book) => void displayBook(book))


let addBookBtn = document.querySelector("#add-btn")
let addBookForm = document.querySelector("form")
addBookBtn.addEventListener("click", () => {
    if (addBookForm.reportValidity()) {
        let bookNameInput = document.querySelector("#book-name")
        let authorNameInput = document.querySelector("#author")
        let pagesInput = document.querySelector("#pages")
        let bookReadInput = document.querySelector("#has-read")


        addBookToLibrary(bookNameInput.value, authorNameInput.value, pagesInput.value, bookReadInput.checked)
        displayBook(myLibrary.at(-1));

        bookNameInput.value = ""
        authorNameInput.value = "";
        pagesInput.value = "";
        bookReadInput.checked = false;
        modal.style.display = "none";
    }
})






