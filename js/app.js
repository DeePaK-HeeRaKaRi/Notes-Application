console.log("This is a Notes App");
showNotes();
var addBtn = document.getElementById("addBtn");
 
addBtn.addEventListener("click", function (e) {
  let addTitle=document.getElementById("addTitle")
  // console.log("title", addTitle)
  let addTxt = document.getElementById("addTxt");
  if(addTitle.value.length >5 && addTxt.value.length>5){
    let todayDate=new Date()
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    }
    // } else { 
    //   notesObj = JSON.parse(notes);

    //   console.log("parse", typeof notesObj, notesObj);
    // }
    let myObj={
      title:addTitle.value,
      text:addTxt.value,
      date:`${todayDate.getDate()}-${todayDate.getMonth()}-${todayDate.getFullYear()} ${todayDate.getHours()}:${todayDate.getMinutes()}:${todayDate.getSeconds()}`,
    
    } 

    notesObj.push(myObj);
    // Array of objects
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // document.getElementById('setItem').innerHTML=addTxt.value
    addTxt.value = "";
    addTitle.value=''

    console.log("stringify", typeof notesObj, notesObj);
    showNotes();
  }else{
    alert('Length should be minimum of 6')
    addTxt.value = "";
    addTitle.value=''
  }
  
});
 
 
function showNotes() {
  let notes = localStorage.getItem("notes");
  // if (notes == null) {
  //   notesObj = [];
  // } else {
  //   notesObj = JSON.parse(notes);
  //   console.log('parse',typeof notesObj,notesObj)
  // }
  notesObj = JSON.parse(notes);
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="my-2 mx-2 card noteCard" style="width: 20rem;height:13rem;overflow: scroll;">
                <div class="card-body">
                  <h5 class="card-title">${element.title} </h5>
                  <p class="card-text" id="setItem">${element.text}</p>
                  <br>
                  <p class="card-text">Created At :- ${element.date}</p>
                  <button id="${index}" onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
        `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  }
}

function deleteNote(indexx) {
  console.log("im deleting", indexx);
  let notes = localStorage.getItem("notes");
  // if (notes == null) {
  //   notesObj = [];
  // } else {
  //   notesObj = JSON.parse(notes);
  // }
  notesObj = JSON.parse(notes);
  if(notesObj.length==1){
    notesObj.pop()
    // notesObj.shift()
    localStorage.setItem("notes", JSON.stringify(notesObj));
    location.reload()
   
    showNotes();
  }else{
    notesObj.splice(indexx, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
  
  
}


let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function (e) {
  let inputVal = searchTxt.value;
  console.log("Input event fired", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (e) {
    let cardTxt = e.getElementsByTagName("h5")[0].innerHTML;
    // console.log(cardTxt)
    if (cardTxt.toLowerCase().includes(inputVal.toLowerCase())) {
      e.style.display = "block";
    } else {
      e.style.display = "none";
    }
  });
});
