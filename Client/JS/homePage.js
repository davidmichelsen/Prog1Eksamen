
window.addEventListener("DOMContentLoaded", () => {

    const editUser = document.getElementById("edit");
    const logOut = document.getElementById("logOut");
    const name = document.getElementById("rName");
    const mail = document.getElementById("rMail");
    const age = document.getElementById("rAge");
    const interests = document.getElementById("rInterests");
    const textField = document.getElementById("rText");
    var fields = [name, mail, age, interests, textField];
    //var userId = '<%= user._id %>';

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