const image = document.getElementById("image");

const xmlRequest = new XMLHttpRequest();

window.addEventListener("DOMContentLoaded", (e) => {

console.log("window loaded");

xmlRequest.onreadystatechange = () => {

    console.log(xmlRequest.responseText);

    var path = xmlRequest.responseText;

    image.src = path;


}

xmlRequest.open("GET", "http://localhost:3000/test", false);
xmlRequest.setRequestHeader("content-type", "multipar/form-data");

xmlRequest.send();



});