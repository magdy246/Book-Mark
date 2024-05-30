var indexNumber = document.getElementById("indexNumber");
var websiteName = document.getElementById("websiteName");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var thisIndex;
var arrayList = [];
if (localStorage.getItem("arrayList") != null) {
  arrayList = JSON.parse(localStorage.getItem("arrayList"));
  showData(arrayList);
}

function addWebsite() {
  var items = {
    name: indexNumber.value,
    website: websiteName.value,
  };
  arrayList.push(items);
  hideData();
  showData(arrayList);
  storgeData();
}

function showData(array) {
  field = ``;
  for (i = 0; i < array.length; i++)
    field += `<tr class="tr-table">
        <td class="p-2 text-center">${arrayList.indexOf(array[i])}</td>
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
  arrayList[thisIndex].name = indexNumber.value;
  showData(arrayList);
  storgeData();
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  hideData();
}

function searchByname(serachValue) {
  var serachList = [];
  for (i = 0; i < arrayList.length; i++)
    if (arrayList[i].name.toLowerCase().includes(serachValue.toLowerCase())) {
      serachList.push(arrayList[i]);
    }
  showData(serachList);
}
