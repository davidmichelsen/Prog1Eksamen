
const loginBut = document.getElementById("login");
const signUpBut = document.getElementById("signupButton");
const myFormData = document.forms.login;

const loginRequest = new XMLHttpRequest();
const signRequest = new XMLHttpRequest();

window.addEventListener("DOMContentLoaded", () => {

    if(localStorage.getItem("loggedIn") == "true") {

        location.replace("homePage.html");

    }

    loginBut.addEventListener("click", (e) => {

        console.log("Logind prøvet")

        loginRequest.open("POST", "http://localhost:3000/login", false);
        loginRequest.setRequestHeader("Content-Type", "application/json");
        loginRequest.send(JSON.stringify({"email": myFormData.elements.email.value, "password": myFormData.elements.password.value}));

    });

    signUpBut.addEventListener("click", () => {

    const myData = new FormData(document.forms.signupForm);

        signRequest.open("POST", "http://localhost:3000/signup", true);
        signRequest.send(myData);

    });

    loginRequest.onreadystatechange = () => {

        if (loginRequest.status == 200) {

            var jsonUser = loginRequest.responseText;

            var parsed = JSON.parse(jsonUser)

            if(localStorage.getItem("user") != undefined) {

                localStorage.removeItem("user");

            }

                localStorage.setItem("user", JSON.stringify(parsed["user"]));

            if(localStorage.getItem("potentials") != undefined) {

                localStorage.removeItem("potentials");

            }

                localStorage.setItem("potentials", JSON.stringify(parsed["potentials"]));

            if(localStorage.getItem("matches") != undefined) {

                localStorage.removeItem("matches");

            }
                localStorage.setItem("matches", JSON.stringify(parsed["allMatches"]));

                localStorage.setItem("loggedIn", "true");

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

        if(signRequest.readyState == XMLHttpRequest.DONE) {

            if(signRequest.status == 200) {

                var response = signRequest.responseText;
    
                var parsed = JSON.parse(response);
    
                localStorage.setItem("user", JSON.stringify(parsed["user"]));
                localStorage.setItem("potentials", JSON.stringify(parsed["potentials"]));
                localStorage.setItem("matches", JSON.stringify(parsed["allMatches"]));
    
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

    }

});