
window.addEventListener("DOMContentLoaded", () => {

    const editUser = document.getElementById("edit");
    const logOut = document.getElementById("logOut");

    //Profile information fields
    const dispName = document.getElementById("name");
    const dispEmail = document.getElementById("email");
    const dispAge = document.getElementById("age");
    const dispGender = document.getElementById("gender");
    const dispPrefGender = document.getElementById("prefGender");
    const dispInterests = document.getElementById("interests");
    const image = document.getElementById("profileImage");
    
    //Edit user information fields
    const name = document.getElementById("rName");
    const mail = document.getElementById("rMail");
    const age = document.getElementById("rAge");
    const interests = document.getElementById("rInterests");
    const textField = document.getElementById("rText");
    var fields = [name, mail, age, interests, textField];

    const myUser = JSON.parse(localStorage.getItem("User"));

    console.log(myUser);

    dispName.innerHTML = "Dit navn: " + myUser.name;
    dispEmail.innerHTML = "Din email: " + myUser.email;
    dispAge.innerHTML = "Din alder: " + myUser.age;
    dispGender.innerHTML = "Dit køn: " + myUser.gender;
    dispPrefGender.innerHTML = "Dit foretrukne køn: " + myUser.preferredGender;
    dispInterests.innerHTML = myUser.userInterests;
    image.src = "http://localhost:3000/" + myUser.image.filename;



        logOut.addEventListener("click", () => {

            location.replace("frontPage.html");

        });

        let request = new XMLHttpRequest();



        editUser.addEventListener("click", () => {

            if (editUser.innerHTML == "Rediger bruger") {

                for(i=0;i<fields.length;i++) {
            
                    fields[i].style.display = "block";

                }

                editUser.innerHTML = "Gem brugeroplysninger";

            }
            
            else if (editUser.innerHTML == "Gem brugeroplysninger") {

                for(i=0;i<fields.length;i++) {
            
                    fields[i].style.display = "none";

                }

                //opdater oplysninger
                if (name.checked == true) {

                    request.open("POST", "/update/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({name: textField.value}));

                } else  if (mail.checked == true) {

                    request.open("POST", "/update/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({email: textField.value}));

                } else if (age.checked == true) {

                    request.open("POST", "/update/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({age: textField.value}));

                } else if (interests.checked == true) {

                    request.open("POST", "/update/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({interests: textField.value}));

                }

                editUser.innerHTML = "Rediger bruger";

            }
            

        });

        request.onreadystatechange = () => {

                var json = JSON.parse(request.responseText);
                console.log(json);

        };

    });