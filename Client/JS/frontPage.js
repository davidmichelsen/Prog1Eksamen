
const loginBut = document.getElementById("login");
const myFormData = document.forms.login;
var myUser = {};

const loginRequest = new XMLHttpRequest();

window.addEventListener("DOMContentLoaded", () => {

    console.log("Page loaded");

    loginBut.addEventListener("click", (e) => {

        e.preventDefault();

        console.log("Logind prøvet")

        loginRequest.open("POST", "http://localhost:3000/login", false);
        loginRequest.setRequestHeader("Content-Type", "application/json");
        loginRequest.send(JSON.stringify({"email": myFormData.elements.email.value, "password": myFormData.elements.password.value}));

    });

    loginRequest.onreadystatechange = () => {

        if (loginRequest.status == 200) {

            var jsonUser = JSON.parse(loginRequest.responseText);

            location.replace("homePage.html");

        }

        if (loginRequest.status == 401) {

            var json = JSON.parse(loginRequest.responseText);
            console.log(json);
        }

        if (loginRequest.status == 404) {
            var json = JSON.parse(loginRequest.responseText);
            console.log(json);        
        }

    };

});