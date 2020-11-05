
const loginBut = document.getElementById("login");
const myFormData = document.forms.login;

const loginRequest = new XMLHttpRequest();

window.addEventListener("DOMContentLoaded", () => {

    console.log("Page loaded")

    loginBut.addEventListener("submit", (e) => {

        e.preventDefault();

        loginRequest.open("POST", "http://localhost:3000/login", false);
        loginRequest.setRequestHeader("Content-Type", "application/json");
        loginRequest.send(JSON.stringify({"email": myFormData.elements.email.value, "password": myFormData.elements.password.value}));

    });

    loginRequest.onreadystatechange = () => {

        if (loginRequest.status == 200) {

            //location.replace("homePage.html");
            var jsonUser = JSON.parse(loginRequest.responseText);
            console.log(jsonUser);
            console.log(jsonUser.email);

            
        }

        if (loginRequest.status == 401) {

            console.log(JSON.stringify(loginRequest.responseText));

        }

        if (loginRequest.status == 404) {
            console.log(JSON.stringify(loginRequest.responseText));
        }

    };

});