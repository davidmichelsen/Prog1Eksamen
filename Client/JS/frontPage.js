
const loginBut = document.getElementById("login");
const signUpBut = document.getElementById("signupButton");
const myFormData = document.forms.login;

const loginRequest = new XMLHttpRequest();
const signRequest = new XMLHttpRequest();

window.addEventListener("DOMContentLoaded", () => {

    loginBut.addEventListener("click", (e) => {

        console.log("Logind prøvet")

        loginRequest.open("POST", "http://localhost:3000/login", false);
        loginRequest.setRequestHeader("Content-Type", "application/json");
        loginRequest.send(JSON.stringify({"email": myFormData.elements.email.value, "password": myFormData.elements.password.value}));

    });

    signUpBut.addEventListener("click", () => {

    console.log("sign up tried");

    const myData = new FormData(document.forms.signupForm);

        signRequest.open("POST", "http://localhost:3000/signup", false);
        signRequest.send(myData);

    });

    loginRequest.onreadystatechange = () => {

        if (loginRequest.status == 200) {

            var jsonUser = loginRequest.responseText;

            localStorage.setItem("User", jsonUser);

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

    signRequest.onreadystatechange = () => {

        if(signRequest.status == 200) {

            var jsonUser = signRequest.responseText;

            localStorage.setItem("User", jsonUser);

            location.replace("homePage.html");

        }

        if (signRequest.status == 401) {

            var json = JSON.parse(signRequest.responseText);
            console.log(json);
        }

        if (signRequest.status == 404) {
            var json = JSON.parse(signRequest.responseText);
            console.log(json);        
        }

    }

});