
const saveRequest = new XMLHttpRequest();

window.addEventListener("DOMContentLoaded", () => {

    const editUser = document.getElementById("edit");
    const logOut = document.getElementById("logOut");
    var potMatchIndex = 0;

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

    //Potential match info fields
    const potName = document.getElementById("pName");
    const potGender = document.getElementById("pGender");
    const potAge = document.getElementById("pAge");
    const potInterests = document.getElementById("pInterests");
    const potImage = document.getElementById("pImg");
    const likeBut = document.getElementById("like");
    const dislikeBut = document.getElementById("dislike");

    const myUser = JSON.parse(localStorage.getItem("user"));
    const allPotentials = JSON.parse(localStorage.getItem("potentials"));
    const myPotentials = allPotentials[myUser.email];

    dispName.innerHTML = "Dit navn: " + myUser.name;
    dispEmail.innerHTML = "Din email: " + myUser.email;
    dispAge.innerHTML = "Din alder: " + myUser.age;
    dispGender.innerHTML = "Dit køn: " + myUser.gender;
    dispPrefGender.innerHTML = "Dit foretrukne køn: " + myUser.preferredGender;
    dispInterests.innerHTML = myUser.userInterests;
    image.src = "http://localhost:3000/" + myUser.image.filename;
    const userId = myUser.id;

    if(myPotentials.length > 0) {

        getPotentialMatch(myPotentials[potMatchIndex]);

    } else {

        potName.innerHTML = "Du har desværre ikke nogle potentielle matches";

    }

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

                    request.open("POST", "http://localhost:3000/update/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({"name": textField.value}));

                } else  if (mail.checked == true) {

                    request.open("POST", "http://localhost:3000/update/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({"email": textField.value}));

                } else if (age.checked == true) {

                    request.open("POST", "http://localhost:3000/update/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({"age": textField.value}));

                } else if (interests.checked == true) {

                    request.open("POST", "http://localhost:3000/update/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({"interests": textField.value}));

                }

                editUser.innerHTML = "Rediger bruger";

            }
            

        });

        request.onreadystatechange = () => {

            if(request.status == 200) {

                var json = JSON.parse(request.responseText);
                console.log(json);

                dispName.innerHTML = "Dit navn: " + json["user"].name;
                dispEmail.innerHTML = "Din email: " + json["user"].email;
                dispAge.innerHTML = "Din alder: " + json["user"].age;
                dispInterests.innerHTML = json["user"].userInterests;
                textField.value = "";

            }
           

        };

        saveRequest.onreadystatechange = () => {

            if (saveRequest.status == 200) {

                console.log(JSON.parse(saveRequest.responseText));

                potMatchIndex += 1;
            
                if (potMatchIndex < myPotentials.length-1) {
                
                    getPotentialMatch(myPotentials[potMatchIndex]);
                
                } else {

                    potName.innerHTML = "Dummy User";
                    potGender.innerHTML = "Du har desværre ikke flere potentielle matches";
                    potAge.innerHTML = "";
                    potInterests.innerHTML = "Interesser: " + "intet";
                    potImage.src = "http://localhost:3000/" + "dummy@dummy.dk-.png";
                    likeBut.style.display = "none";
                    dislikeBut.style.display = "none";

                }

            }

        }

        likeBut.addEventListener("click", () => {

            saveRequest.open("POST", "http://localhost:3000/action/like", false);
            saveRequest.setRequestHeader("content-type", "application/json");
            saveRequest.send(JSON.stringify({userOne: myUser, userTwo: myPotentials[potMatchIndex]}));

        });

        function getPotentialMatch(potMatch) {

            potName.innerHTML = "Navn: " + potMatch.name;
            potGender.innerHTML = "Køn: " + potMatch.gender;
            potAge.innerHTML = "Alder: " + potMatch.age;
            potInterests.innerHTML = "Interesser: " + potMatch.userInterests;
            potImage.src = "http://localhost:3000/" + potMatch.image.filename

        }

    });