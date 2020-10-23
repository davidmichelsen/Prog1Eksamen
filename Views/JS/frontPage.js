
//Initializing variables
const loginEmail = document.getElementById("loginEmail");
const loginPass = document.getElementById("loginPass");
const loginButton = document.getElementById("loginButton");

//Declaring XMLHTTP request
const request = new XMLHttpRequest();


loginButton.addEventListener("submit", (e) => {

    e.preventDefault();

    request.open("POST", "http://localhost:3000/login", false);
    request.setRequestHeader("content-type", "application/json");

    request.send({

        email: loginEmail.value,
        password: loginPass.value

    });


});

request.onreadystatechange = function() {

if (this.readyState == 4 && this.status == 200) {

    alert("Log in processed");

}

};