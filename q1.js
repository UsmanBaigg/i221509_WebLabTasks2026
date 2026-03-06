const gallery = document.getElementById("gallery");
const addBtn = document.getElementById("addBtn");

let images = [
{
url:"https://images.unsplash.com/photo-1501785888041-af3ef285b470",
title:"Mountain",
desc:"Beautiful mountain",
category:"Nature"
},
{
url:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
title:"Bridge",
desc:"Golden gate bridge",
category:"Architecture"
},
{
url:"https://images.unsplash.com/photo-1546182990-dffeafbe841d",
title:"Lion",
desc:"King of jungle",
category:"Animals"
}
];

function displayImages(filter="all"){

gallery.innerHTML="";

images
.filter(img => filter==="all" || img.category===filter)
.forEach(img=>{

const card=document.createElement("div");
card.classList.add("card");

card.innerHTML=`
<img src="${img.url}">
<h4>${img.title}</h4>
`;

gallery.appendChild(card);

});

}

displayImages();


// ADD IMAGE BUTTON
addBtn.addEventListener("click",()=>{

const url=document.getElementById("url").value;
const title=document.getElementById("title").value;
const desc=document.getElementById("desc").value;
const category=document.getElementById("category").value;

if(url==="" || title==="" || desc===""){
alert("Please fill all fields");
return;
}


// TEST IMAGE BEFORE ADDING
let testImage = new Image();
testImage.src = url;

testImage.onload = function(){

images.push({
url:url,
title:title,
desc:desc,
category:category
});

displayImages();

}

testImage.onerror = function(){

alert("Image URL is broken or not accessible. Please check the URL.");

}

});