var bookmarkNameInput = document.getElementById("nameInput");
var bookmarkUrlInput = document.getElementById("urlInput");

var bookmarkList = [];

if (localStorage.getItem("bookmarkContainer") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkContainer"));
  displayData();
}

function addBookmark() {
  if (
    validationBookmark(bookmarkNameInput) &&
    validationBookmark(bookmarkUrlInput)
  ) {
    bookmark = {
      name: bookmarkNameInput.value,
      url: bookmarkUrlInput.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
    displayData();
    clearForm();
  } else {
    document.getElementById("validMsg").classList.remove("d-none");
  }
}

function displayData() {
  var bookmarks = "";

  for (var i = 0; i < bookmarkList.length; i++) {
    var index = i;
    index++;
    bookmarks += `


<tr>
            <td>${index}</td>
            <td class="text-capitalize">${bookmarkList[i].name}</td>
            <td><button onclick="visitBookmark(${i})" class="btn btn-success"><i class="fa-regular fa-eye px-2"></i>visit</button></td>
            <td><button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can px-2"></i>Delete</button></td>
          </tr>


`;
  }

  document.getElementById("tabelBody").innerHTML = bookmarks;
}

function clearForm() {
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;
}

function visitBookmark(index) {
  window.open(`${bookmarkList[index].url}`);
}
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  displayData();
  localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
}

function validationBookmark(element) {
  var term = element.value;
  regex = {
    nameInput: /^[a-zA-z-_][a-zA-Z0-9-_]{2,19}$/,
    urlInput:
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/,
  };
  console.log(element.value);
  if (regex[element.id].test(term)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

function closeMsg() {
  document.getElementById("validMsg").classList.add("d-none");
}
