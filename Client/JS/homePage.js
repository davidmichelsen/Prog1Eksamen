
const saveRequest = new XMLHttpRequest();
const request = new XMLHttpRequest();
const delRequest = new XMLHttpRequest();

window.addEventListener("DOMContentLoaded", () => {

    const editUser = document.getElementById("edit");
    const logOut = document.getElementById("logOut");
    const matchDiv = document.getElementById("allMatches");
    const deleteBut = document.getElementById("deleteBut");
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

    const allMatches = JSON.parse(localStorage.getItem("matches"));
    const myMatches = allMatches[myUser.email];

    dispName.innerHTML = "Dit navn: " + myUser.name;
    dispEmail.innerHTML = "Din email: " + myUser.email;
    dispAge.innerHTML = "Din alder: " + myUser.age;
    dispGender.innerHTML = "Dit køn: " + myUser.gender;
    dispPrefGender.innerHTML = "Dit foretrukne køn: " + myUser.preferredGender;
    dispInterests.innerHTML = myUser.userInterests;
    image.src = "http://localhost:3000/" + myUser.image.filename;
    const userId = myUser.id;

    if(myPotentials != undefined) {

        if(myMatches != undefined) {

        for(i=0; i < myPotentials.length; i++) {

            for(j=0; j < myMatches.length; j++) {

                if(myPotentials[i].email  == myMatches[j].email) {

                    myPotentials.splice(i, 1);
        
                }  

            }  

        }

        }

        if (potMatchIndex == myPotentials.length) {

            potName.innerHTML = "Dummy User";
            potGender.innerHTML = "Du har desværre ikke flere potentielle matches";
            potAge.innerHTML = "";
            potInterests.innerHTML = "Interesser: " + "intet";
            potImage.src = "http://localhost:3000/" + "dummy@dummy.dk-.png";
            likeBut.style.display = "none";
            dislikeBut.style.display = "none";

        } else if(myPotentials.length > 0) {

            getPotentialMatch(myPotentials[potMatchIndex]);

        } else {

            potName.innerHTML = "Du har desværre ikke nogle potentielle matches";
            likeBut.style.display = "none";
            dislikeBut.style.display = "none";

        }

    }

    if(myMatches != undefined) {

        if(myMatches.length > 0) {

        for(i=0; i < myMatches.length; i++) {

            var newItem = document.createElement("p");
            newItem.innerHTML = myMatches[i].name + ", " + myMatches[i].email + ", " + myMatches[i].age;
            matchDiv.appendChild(newItem);
    
            }

        }

    }

        deleteBut.addEventListener("click", () => {

            if (deleteBut.innerHTML == "Slet bruger") {

                deleteBut.innerHTML = "Ja";
                deleteBut.style.backgroundColor = "red";

                setTimeout(() => {

                    deleteBut.innerHTML = "Slet bruger";
                    deleteBut.style.backgroundColor = "";


                }, 5000);

            } else if (deleteBut.innerHTML == "Ja") {

                delRequest.open("POST","http://localhost:3000/update/delete", false);
                delRequest.setRequestHeader("content-type", "application/json");
                delRequest.send(JSON.stringify({"email": myUser.email}));    

            }

        });

        logOut.addEventListener("click", () => {

            localStorage.setItem("loggedIn", "false");

            location.replace("frontPage.html");

        });

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

                    request.open("POST", "http://localhost:3000/update/user/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({"name": textField.value}));

                } else  if (mail.checked == true) {

                    request.open("POST", "http://localhost:3000/update/user/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({"email": textField.value}));

                } else if (age.checked == true) {

                    request.open("POST", "http://localhost:3000/update/user/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({"age": textField.value}));

                } else if (interests.checked == true) {

                    request.open("POST", "http://localhost:3000/update/user/"+userId, true);

                    request.setRequestHeader("Content-Type", "application/json");

                    request.send(JSON.stringify({"interests": textField.value}));

                }

                editUser.innerHTML = "Rediger bruger";

            }
            

        });

        delRequest.onreadystatechange = () => {

            if (delRequest.readyState = XMLHttpRequest.DONE) {

                if (delRequest.status == 200) {

                    localStorage.removeItem("user");
                    localStorage.removeItem("potentials");
                    localStorage.removeItem("matches");

                    location.replace("frontPage.html");

                }

            }

        };

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

                const parsed = JSON.parse(saveRequest.responseText);
                const newMatches = parsed["allMatches"];
                const myNew = newMatches[myUser.email];

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

                while(matchDiv.firstChild) {

                    matchDiv.removeChild(matchDiv.lastChild);

                }

                var newItem = document.createElement("h2");
                newItem.innerHTML = "Dine matches:";
                matchDiv.appendChild(newItem);

                for (i=0; i < myNew.length; i++) {

                var item = document.createElement("p");
                item.innerHTML = myNew[i].name + ", " + myNew[i].email + ", " + myNew[i].age;
                matchDiv.appendChild(item);

                }

            }

        }

        likeBut.addEventListener("click", () => {

            saveRequest.open("POST", "http://localhost:3000/action/like", false);
            saveRequest.setRequestHeader("content-type", "application/json");
            saveRequest.send(JSON.stringify({userOne: myUser, userTwo: myPotentials[potMatchIndex]}));

        });

        dislikeBut.addEventListener("click", () => {

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

        });

        function getPotentialMatch(potMatch) {

            potName.innerHTML = "Navn: " + potMatch.name;
            potGender.innerHTML = "Køn: " + potMatch.gender;
            potAge.innerHTML = "Alder: " + potMatch.age;
            potInterests.innerHTML = "Interesser: " + potMatch.userInterests;
            potImage.src = "http://localhost:3000/" + potMatch.image.filename

        }

    });