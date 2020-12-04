// let's define the variables ..
const input=document.getElementById("input");
const btn_add=document.getElementById("btn_add");
const btn_deleteall=document.getElementById("btn_deleteall");
const list=document.getElementById("list_ul");
let array;

// declaring functions
eventListener();
loadItems();

// events listen
function eventListener(){
    btn_add.addEventListener("click",addItem);
    btn_deleteall.addEventListener("click",deleteAllItems);
    list.addEventListener("click",deleteAnItem);
}

// add a new item
function addItem(e){
    let text=input.value;
    if(input.value==""){
        alert("Fill in the blank!");
    }else{
        create(text);
        setItemToLS(text);
        input.value="";
    }  
    e.preventDefault();
}
//load items
function loadItems(){
    array=getItemsFromLS();
    array.forEach(text=> {
            create(text);
    });
}
// get from local storage
function getItemsFromLS(){
    if(localStorage.getItem("array")===null){
        array=[];
    }else{
        array=JSON.parse(localStorage.getItem("array"));
    }
    return array;
}
// create an item
function create(text){
    let html=`<li>${text}
    <a href="#" id="btn_delete">
    <i class="fas fa-times"></i>
    </a></li>`;
    let li=document.createElement("li");
    li.setAttribute("class", "liStyle");
    li.innerHTML+=html;
    list.appendChild(li);
}
// set local storage
function setItemToLS(text){
    array=getItemsFromLS();
    array.push(text);
    localStorage.setItem("array",JSON.stringify(array));
}

// delete all items
function deleteAllItems(e){
    if(confirm("Are you sure?")){
       list.innerHTML="";
// delete all items from local storage
       localStorage.clear();
    }
    e.preventDefault();
}


//delete only an item
function deleteAnItem(e){
   if(e.target.className=="fas fa-times"){
       if(confirm("Are you sure?")){
        e.target.parentElement.parentElement.parentElement.remove();
        deleteAnItemFromLS(e.target.parentElement.parentElement.textContent);
       }
   }    
    e.preventDefault();
}
// delete an item from local storage
function deleteAnItemFromLS(text){
    let i;
    array=getItemsFromLS();
    localStorage.removeItem("array");
    array.forEach((item,index)=>{
        if(item===index) {
            i=index;
        };
    });
    array.splice(i,1);
    localStorage.setItem("array",JSON.stringify(array));
}