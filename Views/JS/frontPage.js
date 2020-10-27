
//Initializing variables
const signupEmail = document.getElementById("signupEmail");
const signupPass = document.getElementById("signupPass");
const signupButton = document.getElementById("signupButton");
const name = document.getElementById('name');
const age = document.getElementById('age');
const gender = document.getElementById('gender');
const prefGender = document.getElementById('preGender');
const interests = document.getElementById('interests');
const chosenFile = document.getElementById("image");

/*

//Declaring XMLHTTP request
const request = new XMLHttpRequest();
request.setRequestHeader("content-type", "multipart/form-data");

//Declaring form data to send to server
const requestData = new FormData();

loginButton.addEventListener("submit", (e) => {

    console.log(chosenFile.dom.files[0]);

    e.preventDefault();

    request.open("POST", "http://localhost:3000/signup", false);

    const userInterests = interests.split(" ");

    //Append form data to send to server
    requestData.append("email", signupEmail.value);
    requestData.append("password", signupPass.value);
    requestData.append("name", name.value);
    requestData.append("age", age.value);
    requestData.append("gender", gender.value);
    requestData.append("preferredGender", prefGender.value);
    requestData.append("interests", userInterests);
    requestData.append("image", new Blob([chosenFile.files[0]], {"type": "image/jpeg"}));

    request.send(requestData);

});
*/