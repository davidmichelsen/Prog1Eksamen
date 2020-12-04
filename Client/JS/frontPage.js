//Declare HTTP requests
const loginRequest = new XMLHttpRequest();
const signRequest = new XMLHttpRequest();

window.addEventListener("DOMContentLoaded", () => {

    //Check if user is already logged in from earlier
    if(localStorage.getItem("loggedIn") == "true") {

        //If yes go to home page
        location.replace("homePage.html");

    }

    //Get log in and sign up button from HTML page
    const loginBut = document.getElementById("login");
    const signUpBut = document.getElementById("signupButton");

    //Get sign up form data from HTML page
    const myFormData = document.forms.login;

    //The user clicked the "Log in" button
    loginBut.addEventListener("click", (e) => {

        //Open log in request and send the typed email and password to the API
        loginRequest.open("POST", "http://localhost:3000/login", false);
        loginRequest.setRequestHeader("Content-Type", "application/json");
        loginRequest.send(JSON.stringify({"email": myFormData.elements.email.value, "password": myFormData.elements.password.value}));

    });

    //The user clicked the "Sign up" button
    signUpBut.addEventListener("click", () => {

    //Get the typed data from the sign up form from the HTML page
    const myData = new FormData(document.forms.signupForm);

        //Open the sign up request and send the data to the API
        signRequest.open("POST", "http://localhost:3000/signup", true);
        signRequest.send(myData);

    });

    //Listen for response to log in
    loginRequest.onreadystatechange = () => {

        //Check for response stats of "OKAY"
        if (loginRequest.status == 200) {

            //Save reponse text and parse it as a readable object
            var jsonUser = loginRequest.responseText;

            var parsed = JSON.parse(jsonUser)

            //Check if locale storage has data saved for the user, potential likes and matches
            //Hereafter remove it if there is any existing data and save the newly gotten data from login
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

                //Save the user as logged in
                localStorage.setItem("loggedIn", "true");

            //After having saved all data to locale storage go to the home page
            location.replace("homePage.html");

        }

        //Handle reponse of unauthorised
        if (loginRequest.status == 401) {

            //Save response and log it to the console
            var json = JSON.parse(loginRequest.responseText);
            console.log(json);
        }

        //Handle response of no existing user
        if (loginRequest.status == 404) {

            //Save response and log it to the console
            var json = JSON.parse(loginRequest.responseText);
            console.log(json);        
        }

    };

    //Listen for response to sign up
    signRequest.onreadystatechange = () => {

        //Check if the request was sent
        if(signRequest.readyState == XMLHttpRequest.DONE) {

            //Check for response of "OKAY"
            if(signRequest.status == 200) {

                //Save response text as readable object
                var response = signRequest.responseText;
                var parsed = JSON.parse(response);
    
                //Check if locale storage has data saved for the user, potential likes and matches
                //Hereafter remove it if there is any existing data and save the newly gotten data from sign up
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
    
                //Save the user as logged in
                localStorage.setItem("loggedIn", "true");

                //After having saved all data to locale storage go to the home page
                location.replace("homePage.html");
    
            }
    
            //Handle response status of "Unauthorised"
            if (signRequest.status == 401) {
    
                //Save response text and log it to the console
                var json = JSON.parse(signRequest.responseText);
                console.log(json);
            }
    
            //Handle response status of "Couldn't save user"
            if (signRequest.status == 404) {

                //Save response text and log it to the console
                var json = JSON.parse(signRequest.responseText);
                console.log(json);        
            }

        }

    }

});