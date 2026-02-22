//global variable
let editIndex = null;

function getAndUpdate() {
  let tit = document.getElementById("title").value;
  let desc = document.getElementById("description").value;

  if (tit === "" || desc === "") {
    alert("Please fill all fields");
    return;
  }

  let itemJsonArray = JSON.parse(localStorage.getItem('itemJson')) || [];

  // EDIT MODE
  if (editIndex !== null) {
    itemJsonArray[editIndex][0] = tit;
    itemJsonArray[editIndex][1] = desc;
    editIndex = null;

    document.getElementById("add").innerText = "Add To List";
    document.getElementById("add").classList.remove("btn-success");
    document.getElementById("add").classList.add("btn-primary");
  }
  // ADD MODE
  else {
    itemJsonArray.push([tit, desc, false]);
  }

  localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  update();
}

//Previous function without having edit option:
// function getAndUpdate()
//   {
//     console.log("Updating list");
//     tit=document.getElementById("title").value;
//     desc=document.getElementById("description").value;
//     if(localStorage.getItem('itemJson')==null){
//       itemJsonArray=[];
//       itemJsonArray.push([tit,desc]);
//       localStorage.setItem('itemJson',JSON.stringify(itemJsonArray))
//     }
//     else{
//       itemJsonArrayStr=localStorage.getItem('itemJson');
//       itemJsonArray=JSON.parse(itemJsonArrayStr);
//       //itemJsonArray.push([tit,desc]);
//       itemJsonArray.push([tit, desc, false]);
//       localStorage.setItem('itemJson',JSON.stringify(itemJsonArray))
//     }
//     update();

//   }

  function update()
  {
    if(localStorage.getItem('itemJson')==null){
      itemJsonArray=[];
      
      localStorage.setItem('itemJson',JSON.stringify(itemJsonArray))
    }
    else{
      itemJsonArrayStr=localStorage.getItem('itemJson');
      itemJsonArray=JSON.parse(itemJsonArrayStr);
      
    }
   
//Populate the table
tableBody=document.getElementById("tableBody");
let str= "";

itemJsonArray.forEach((element,index)=>{
    str+= `<tr>
  <th scope="row">${index + 1}</th>

  <td style="${element[2] ? 'text-decoration:line-through' : ''}">
    ${element[0]}
  </td>

  <td style="${element[2] ? 'text-decoration:line-through' : ''}">
    ${element[1]}
  </td>

  <td>
    <button class="btn btn-warning btn-sm me-1"
      onclick="editTask(${index})">
      Edit
    </button>

    <button class="btn btn-danger btn-sm"
      onclick="onDelete(${index})">
      Delete
    </button>
  </td>

  <td>
  <div class="d-flex justify-content-center">
    <input class="form-check-input" type="checkbox"
    ${element[2] ? "checked" : ""}
    onchange="toggleStatus(${index})">
  </div>
  </td>

</tr>`;
 {/* Before's Code
    /*<td style="${element[2] ? 'text-decoration:line-through' : ''}">
        ${element[0]}
        </td>
        <td style="${element[2] ? 'text-decoration:line-through' : ''}">
        ${element[1]}
        </td>
        <td>
        <button class="btn btn-danger btn-sm" onClick="onDelete(${index})">Delete</button>
        </td>
        <td>
        <input class="form-check-input" type="checkbox"
        ${element[2] ? "checked" : ""}
        onchange="toggleStatus(${index})">
        </td>`;   */}
    })
    tableBody.innerHTML=str;
  }
  

  add=document.getElementById("add");


  add.addEventListener("click",getAndUpdate);
  update();

  function onDelete(itemIndex)
  {
    console.log("Delete",itemIndex);
     itemJsonArrayStr=localStorage.getItem('itemJson');
      itemJsonArray=JSON.parse(itemJsonArrayStr);
      //Delete itemIndex element from the array
      itemJsonArray.splice(itemIndex,1);
      localStorage.setItem('itemJson',JSON.stringify(itemJsonArray))
      update();
  }
    
function doClear()
{
  if(confirm("Are you sure to clear the list?")){
  console.log("Clearing the storage...");
  localStorage.clear();
  update();
  }
}
  

//next extra code:
function toggleStatus(index) {
  let itemJsonArrayStr = localStorage.getItem('itemJson');
  let itemJsonArray = JSON.parse(itemJsonArrayStr);

  // Toggle completed status
  itemJsonArray[index][2] = !itemJsonArray[index][2];

  localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
  update();
}

// FILTER FUNCTIONS (used in navbar)
function showAll() {
  update();
}

function showCompleted() {
  let itemJsonArray = JSON.parse(localStorage.getItem('itemJson')) || [];
  let tableBody = document.getElementById("tableBody");
  let str = "";

  itemJsonArray.forEach((element, index) => {
    if (element[2] === true) {
      str += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td style="text-decoration:line-through">${element[0]}</td>
        <td style="text-decoration:line-through">${element[1]}</td>

        <td>
        <button class="btn btn-warning btn-sm me-1" onclick="editTask(${index})">Edit</button>

        <button class="btn btn-danger btn-sm" onClick="onDelete(${index})">Delete</button>
        </td>

        <td>
        <div class="d-flex justify-content-center">
        <input class="form-check-input" type="checkbox"
        ${element[2] ? "checked" : ""}
        onchange="toggleStatus(${index})">
        </div>
        </td>
      </tr>`;
    }
  });

  tableBody.innerHTML = str;
}

function showPending() {
  let itemJsonArray = JSON.parse(localStorage.getItem('itemJson')) || [];
  let tableBody = document.getElementById("tableBody");
  let str = "";

  itemJsonArray.forEach((element, index) => {
    if (element[2] === false) {
      str += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>

        <td>
        <button class="btn btn-warning btn-sm me-1" onclick="editTask(${index})">Edit</button>

        <button class="btn btn-danger btn-sm" onClick="onDelete(${index})">Delete</button>
        </td>

        <td>
        <div class="d-flex justify-content-center">
          <input class="form-check-input" type="checkbox" 
            onchange="toggleStatus(${index})">
        </div>
        </td>
      </tr>`;
    }
  });

  tableBody.innerHTML = str;
}

//edit the task:
function editTask(index) {
  let itemJsonArray = JSON.parse(localStorage.getItem('itemJson'));

  document.getElementById("title").value = itemJsonArray[index][0];
  document.getElementById("description").value = itemJsonArray[index][1];

  editIndex = index;

  document.getElementById("add").innerText = "Update Task";
  document.getElementById("add").classList.remove("btn-primary");
  document.getElementById("add").classList.add("btn-success");
}

