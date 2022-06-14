const books = [
  {
    id: 1,
    name: "Alximik",
    author: "Paolo Koelyo",
    pages: 153,
  },
  {
    id: 2,
    name: "Shaytonat",
    author: "Toxir Malik",
    pages: 864,
  },
  {
    id: 3,
    name: "Sariq devni minib",
    author: "Xudoyberdi To'xtaboyev",
    pages: 356,
  },
  {
    id: 4,
    name: "Ufq romani",
    author: "O'tkir Xoshimov",
    pages: 482,
  },
];

const buttonSaveChanges = document.createElement("button");
const modalBody = document.getElementById("modal-body-edit");
const modalFooter = document.getElementById("modal-footer-edit");

function renderedBooks() {
  const tbody = document.getElementById("tbody");
  let elements = "";

  books.forEach((item, index) => {
    elements += `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.author}</td>
            <td>${item.pages}</td>
            <td><button onclick="deleteBook(${
              item.id
            })" class="btn btn-danger btn-sm">Delete</button>
            <button onclick="editBook(${
              item.id
            })" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#editBook">edit</button></td>
          </tr>`;
  });

  tbody.innerHTML = elements;
}
renderedBooks();

function deleteBook(id) {
  books.forEach((item, index) => {
    if (item.id === id) {
      books.splice(index, 1);
      renderedBooks();
    }
  });
}

function editBook(id) {
  let name = "";
  let author = "";
  let pages = 0;
  books.forEach((item) => {
    if (item.id === id) {
      name = item.name;
      author = item.author;
      pages = item.pages;
    }
  });

  modalBody.innerHTML = `<form>
                <div class="mb-2">
                  <label for="name" class="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="form-control editBook"
                    value="${name}"
                  />
                </div>
                <div class="mb-2">
                  <label for="author" class="form-label">Author</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    class="form-control editBook"
                    value="${author}"
                  />
                </div>
                <div class="mb-2">
                  <label for="pages" class="form-label">Pages</label>
                  <input
                    type="number"
                    id="pages"
                    name="pages"
                    class="form-control editBook"
                    value="${pages}"
                  />
                </div>
              </form>`;

  buttonSaveChanges.classList.add("btn", "btn-primary");
  buttonSaveChanges.innerText = "Save changes";
  buttonSaveChanges.setAttribute("type", "button");
  buttonSaveChanges.setAttribute("onclick", `saveChanges(${id})`);
  buttonSaveChanges.setAttribute("data-bs-dismiss", "modal");
  modalFooter.appendChild(buttonSaveChanges);
}

function saveChanges(id) {
  const inputs = document.querySelectorAll(".editBook");
  let name = inputs[0].value;
  let author = inputs[1].value;
  let pages = inputs[2].value;
  books.forEach((item) => {
    if (item.id === id) {
      item.name = name;
      item.author = author;
      item.pages = pages;
    }
  });
  renderedBooks();
}

function addBookClicked() {
  const button = document.querySelector(".saveAddBook");
  button.setAttribute("data-bs-dismiss", "modal");
}

function addBook() {
  const inputs = document.querySelectorAll(".addBook");
  let name = inputs[0].value;
  let author = inputs[1].value;
  let pages = Number(inputs[2].value);
  let id = Math.round(
    Math.random() * 1000 + books.length * Math.random() * 100 + books.length
  );
  books.push({ id, name, author, pages });
  renderedBooks();
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
}
