var indexNumber = document.getElementById("indexNumber");
var websiteName = document.getElementById("websiteName");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var classModal = document.getElementById("staticBackdrop");
var closeModal = document.getElementById("closeBtn");
var thisIndex;
var arrayList = [];
if (localStorage.getItem("arrayList") != null) {
  arrayList = JSON.parse(localStorage.getItem("arrayList"));
  showData(arrayList);
}

function addWebsite() {
  if (validated() == true) {
    var items = {
      name: indexNumber.value,
      website: websiteName.value,
    };
    arrayList.push(items);
    hideData();
    removeClasses();
    showData(arrayList);
    storgeData();
  } else {
    openModal();
  }
}

function showData(array) {
  field = ``;
  for (i = 0; i < array.length; i++)
    field += `<tr class="tr-table">
        <td class="p-2 text-center">${arrayList.indexOf(array[i]) + 1}</td>
        <td class="p-2 text-center">${array[i].name}</td>
        <td class="p-2 text-center"><a class="text-decoration-none" href="https://${
          array[i].website
        }"><button onclick="visitItem()"
        class="d-flex align-items-center mx-auto btn-visit btn text-white"><i
            class="fa-solid fa-eye p-0 pe-sm-2"></i>Visit</button></a></td>
<td class="p-2 text-center"><button onclick="deleteItem(${i})"
        class="d-flex align-items-center mx-auto btn-delete btn text-white"><i
            class="fa-solid fa-trash-can p-0 pe-sm-2"></i>Delete</button></td>
<td class="p-2 text-center"><button onclick="getUpdate(${i})"
        class="d-flex align-items-center mx-auto btn-update btn text-white"><i
            class="fa-solid fa-cloud-upload-alt p-0 pe-sm-2"></i>Update</button></td>
            </tr>`;
  document.getElementById("show-data").innerHTML = field;
  storgeData();
}

function hideData(config) {
  indexNumber.value = config ? config.name : null;
  websiteName.value = config ? config.website : null;
}

function storgeData() {
  localStorage.setItem("arrayList", JSON.stringify(arrayList));
}

function deleteItem(i) {
  arrayList.splice(i, 1);
  storgeData();
  showData(arrayList);
}

function getUpdate(i) {
  hideData(arrayList[i]);
  thisIndex = i;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateItems() {
  if (validated() == true) {
    arrayList[thisIndex].name = indexNumber.value;
    arrayList[thisIndex].website = websiteName.value;
    showData(arrayList);
    storgeData();
    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    hideData();
    removeClasses();
  } else {
    openModal();
  }
}

function searchByname(serachValue) {
  var serachList = [];
  for (i = 0; i < arrayList.length; i++)
    if (arrayList[i].name.toLowerCase().includes(serachValue.toLowerCase())) {
      serachList.push(arrayList[i]);
    }
  showData(serachList);
}

function validated() {
  var indexNumberRegex = /^[a-z0-9_-]{3,15}$/;
  var websiteNameRegex =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

  if (indexNumberRegex.test(indexNumber.value) == false) {
    return false;
  } else if (websiteNameRegex.test(websiteName.value) == false) {
    return false;
  }
  return true;
}

function removeClasses() {
  if (indexNumber.value == "") {
    indexNumber.classList.remove("is-valid");
    indexNumber.classList.remove("is-invalid");
  }
  if (websiteName.value == "") {
    websiteName.classList.remove("is-valid");
    websiteName.classList.remove("is-invalid");
  }
}

/*******************************Anouther step to validate********************************/
/*you should add {oninput="validaiton(this)"} in input in html it's mean spacify this id*/
/****************************************************************************************/

function validaiton(websites) {
  var websitesRegex = {
    indexNumber: /^[a-z0-9_-]{3,15}$/,
    websiteName:
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  };
  regex = websitesRegex[websites.id].test(websites.value);

  if (regex == true) {
    websites.classList.add("is-valid");
    websites.classList.remove("is-invalid");
    return true;
  } else {
    websites.classList.add("is-invalid");
    websites.classList.remove("is-valid");
    return false;
  }
}

/*Modal Action*/ 
function openModal() {
  classModal.classList.remove("d-none");
  classModal.classList.add("d-block");
  classModal.classList.add("bg-black");
  classModal.classList.add("bg-opacity-75");
}

function closeBtn() {
  classModal.classList.add("d-none");
  classModal.classList.remove("d-block");
}
