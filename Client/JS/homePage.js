//Declare all HTTP updateUserRequests
const saveRequest = new XMLHttpRequest();
const updateUserRequest = new XMLHttpRequest();
const delRequest = new XMLHttpRequest();
const removeMatchReq = new XMLHttpRequest();

//Wait to after all elements of the HTML page have been loaded
window.addEventListener("DOMContentLoaded", () => {

    //Get buttons from HTML page
    const editUser = document.getElementById("edit");
    const logOut = document.getElementById("logOut");
    const matchDiv = document.getElementById("allMatches");
    const deleteBut = document.getElementById("deleteBut");
    const editMatches = document.getElementById("editMatches");

    //Initiate index of the current potential like
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

    //Get the current logged in user from local storage
    const myUser = JSON.parse(localStorage.getItem("user"));

    //Get all potential likes from local storage
    const allPotentials = JSON.parse(localStorage.getItem("potentials"));

    //Get all potential likes for the current user
    const myPotentials = allPotentials[myUser.email];

    //Get all matches from locale storage
    const allMatches = JSON.parse(localStorage.getItem("matches"));

    //Get all matches for the current user
    var myMatches = allMatches[myUser.email];

    //Initiate an integer for the amount of matches the current user has
    var amountOfMatches = 0;

    //Load all the information and the image of the current user
    dispName.innerHTML = "Dit navn: " + myUser.name;
    dispEmail.innerHTML = "Din email: " + myUser.email;
    dispAge.innerHTML = "Din alder: " + myUser.age;
    dispGender.innerHTML = "Dit køn: " + myUser.gender;
    dispPrefGender.innerHTML = "Dit foretrukne køn: " + myUser.preferredGender;
    dispInterests.innerHTML = myUser.userInterests;
    image.src = "http://localhost:3000/" + myUser.image.filename;
    const userId = myUser.id;
    
    //Create text field element for deleting match but hide it
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Indtast match-email";
    input.id = "matchMail";
    input.style.display = "none";

    //Make sure the potential likes of the current user aren't null
    if(myPotentials != undefined) {

        //Make sure the curent user has some matches
        if(myMatches != undefined) {

        //Iterate over the current user's matches and potential likes
        for(i=0; i < myPotentials.length; i++) {

            for(j=0; j < myMatches.length; j++) {

                //If the current user has already matched with some of the potential likes
                //remove the potential like from the array of potential likes which are to be shown
                if(myPotentials[i].email  == myMatches[j].email) {

                    myPotentials.splice(i, 1);
        
                }  

            }  

        }

        }

        //After having removed the already matches user, check if there are still any potential likes
        //If not show the dummy user
        if (potMatchIndex == myPotentials.length) {

            potName.innerHTML = "Dummy User";
            potGender.innerHTML = "Du har desværre ikke flere potentielle matches";
            potAge.innerHTML = "";
            potInterests.innerHTML = "Interesser: " + "intet";
            potImage.src = "http://localhost:3000/" + "dummy@dummy.dk-.png";
            likeBut.style.display = "none";
            dislikeBut.style.display = "none";
        
        //If there are still potential likes show the next potential like
        } else if(myPotentials.length > 0) {

            getPotentialMatch(myPotentials[potMatchIndex]);
        
        //There no potential likes at all and the current user is not compatible with any of the other users
        } else {

            potName.innerHTML = "Du har desværre ikke nogle potentielle matches";
            likeBut.style.display = "none";
            dislikeBut.style.display = "none";

        }

    }

    //Make sure the user has more than 0 matches
    if(myMatches != undefined) {

        if(myMatches.length > 0) {

            //Save the amount of matches
            amountOfMatches = myMatches.length;

        //Iterate through all of the user's matches and create a P-element to show it with
        for(i=0; i < myMatches.length; i++) {

            var newItem = document.createElement("p");
            newItem.innerHTML = myMatches[i].name + ", " + myMatches[i].email + ", " + myMatches[i].age;
            matchDiv.appendChild(newItem);
    
            }

        }

    }

    //Import the textfield for removing a match to the HTML document
    matchDiv.appendChild(input);

    //The "Edit matches" button has been pushed
    //Handle click event
    editMatches.addEventListener("click", () => {

        //Check the state of the button
        if (editMatches.innerHTML == "Rediger matches") {

            //Show text field to remove match
            document.getElementById("matchMail").style.display = "block";
    
            //Change the state of the clicked button
            editMatches.innerHTML = "Slet indtastet match";
            editMatches.style.backgroundColor = "red";

            //Set timer to reverse click of the button
            setTimeout(() => {

                editMatches.innerHTML = "Rediger matches";
                editMatches.style.backgroundColor = "";
                document.getElementById("matchMail").style.display = "none";

            }, 10000);

        //The user has now entered the mail of the match they want to remove
        //and clicked the button again
        } else if(editMatches.innerHTML == "Slet indtastet match") {

            //Open the http updateUserRequest, set the header and send the mail of the match that should be reomved
            //as well as the mail of the current user
            removeMatchReq.open("POST", "http://localhost:3000/update/deleteMatch");
            removeMatchReq.setupdateUserRequestHeader("content-type", "application/json");
            removeMatchReq.send(JSON.stringify({"matchEmail": document.getElementById("matchMail").value, "myEmail": myUser.email}));

            //Change the state of the button
            editMatches.innerHTML = "Rediger matches";

            //Hide text field again
            document.getElementById("matchMail").style.display = "none";

        }

        

    });

    //The user has clicked the "Delete user" button
    deleteBut.addEventListener("click", () => {

        //Check the state of the button
        if (deleteBut.innerHTML == "Slet bruger") {

            //Change the state of the button
            deleteBut.innerHTML = "Ja";
            deleteBut.style.backgroundColor = "red";

            //Begin timer to reverse state of button
            setTimeout(() => {

                deleteBut.innerHTML = "Slet bruger";
                deleteBut.style.backgroundColor = "";


            }, 5000);

        //The user clicked the button again before the timer ended
        } else if (deleteBut.innerHTML == "Ja") {

            //Open http updateUserRequest for deleting user
            //Send user email to API
            delRequest.open("POST","http://localhost:3000/update/delete", false);
            delRequest.setupdateUserRequestHeader("content-type", "application/json");
            delRequest.send(JSON.stringify({"email": myUser.email}));    

        }

    });

    //The user clicked the "Log out" button
    logOut.addEventListener("click", () => {

        //Change state of boolean in locale storage which indicates if the user is logged in
        localStorage.setItem("loggedIn", "false");

        //Go back to log in page
        location.replace("frontPage.html");

    });

    //The user clicked the "Update user" button
    editUser.addEventListener("click", () => {

        //Check state of button
        if (editUser.innerHTML == "Rediger bruger") {

            //Show the radio buttons that let the user decide which specific information to update
            for(i=0;i<fields.length;i++) {
        
                fields[i].style.display = "block";

            }
            
            //Change state of the button
            editUser.innerHTML = "Gem brugeroplysninger";

        }
        
        //The user clicked the button again and wishes to update som info
        else if (editUser.innerHTML == "Gem brugeroplysninger") {

            //Hide all radio buttons again
            for(i=0;i<fields.length;i++) {
        
                fields[i].style.display = "none";

            }

            //Check which of the radio buttons and thereby which of the information fields the user wants to change
            if (name.checked == true) {

                //Open http updateUserRequest to change name and send the new name
                updateUserRequest.open("POST", "http://localhost:3000/update/user/"+userId, true);

                updateUserRequest.setupdateUserRequestHeader("Content-Type", "application/json");

                updateUserRequest.send(JSON.stringify({"name": textField.value}));

            } else  if (mail.checked == true) {

                //Open http updateUserRequest to change email and send the new email
                updateUserRequest.open("POST", "http://localhost:3000/update/user/"+userId, true);

                updateUserRequest.setupdateUserRequestHeader("Content-Type", "application/json");

                updateUserRequest.send(JSON.stringify({"email": textField.value}));

            } else if (age.checked == true) {

                //Open http updateUserRequest to change age and send the new age
                updateUserRequest.open("POST", "http://localhost:3000/update/user/"+userId, true);

                updateUserRequest.setupdateUserRequestHeader("Content-Type", "application/json");

                updateUserRequest.send(JSON.stringify({"age": textField.value}));

            } else if (interests.checked == true) {

                //Open http updateUserRequest to change interests and send the new interests
                updateUserRequest.open("POST", "http://localhost:3000/update/user/"+userId, true);

                updateUserRequest.setupdateUserRequestHeader("Content-Type", "application/json");

                updateUserRequest.send(JSON.stringify({"interests": textField.value}));

            }

            //Change the state of the button
            editUser.innerHTML = "Rediger bruger";

        }
        

    });

    //The user clicked the "Like user" button
    likeBut.addEventListener("click", () => {

        //Open request to like a new user and send both the current user and the liked user
        saveupdateUserRequest.open("POST", "http://localhost:3000/action/like", false);
        saveupdateUserRequest.setupdateUserRequestHeader("content-type", "application/json");
        saveupdateUserRequest.send(JSON.stringify({userOne: myUser, userTwo: myPotentials[potMatchIndex]}));

    });

    //The user clicked the "Dislike user" button
    dislikeBut.addEventListener("click", () => {

        //Add one to index of which user is being shown
        potMatchIndex += 1;
        
        //Check if the end of the potential likes have been reached
        if (potMatchIndex < myPotentials.length-1) {
            
            //If not show the next potential like
            getPotentialMatch(myPotentials[potMatchIndex]);
        
        } else {

            //There are no more potential likes
            //Show the dummy user
            potName.innerHTML = "Dummy User";
            potGender.innerHTML = "Du har desværre ikke flere potentielle matches";
            potAge.innerHTML = "";
            potInterests.innerHTML = "Interesser: " + "intet";
            potImage.src = "http://localhost:3000/" + "dummy@dummy.dk-.png";

            //Hide the like and dislike button
            likeBut.style.display = "none";
            dislikeBut.style.display = "none";

        }

    });

    //Listen for response to deleted match
    removeMatchReq.onreadystatechange = () => {

        //Check that the response was "OKAY"
        if(removeMatchReq.status == 200) {
            
            //Save the response text and parse it to readable objects
            var response = removeMatchReq.responseText;
            var parsed = JSON.parse(response);
            var newMatches = parsed["allMatches"];

            //Assign the new matches to the current user
            var myNew = newMatches[myUser.email];
            myMatches = myNew;

            //Save the new matches to locale storage
            localStorage.setItem("matches", JSON.stringify(myNew));

            //Remove existing matches from HTML page
            while(matchDiv.firstChild) {

                matchDiv.removeChild(matchDiv.lastChild);

            }

            //Insert text above matches again
            var newItem = document.createElement("h2");
            newItem.innerHTML = "Dine matches:";
            matchDiv.appendChild(newItem);

            //Iterate through the new matches and create a P-element for each of the matches
            for (i=0; i < myNew.length; i++) {

            var item = document.createElement("p");
            item.innerHTML = myNew[i].name + ", " + myNew[i].email + ", " + myNew[i].age;
            matchDiv.appendChild(item);

            }

            //Check if the new amount of matches is greater than the previos amount
            if(myNew.length > amountOfMatches) {

                //If yes notify the user of a New Match!
                alert("Nyt match!");

               }

            }

        }

    //Listen for response of deleted user
    delRequest.onreadystatechange = () => {

        //If the updateUserRequest was done sending and received a status of "OKAY"
        if (delRequest.readyState = XMLHttpRequest.DONE) {

            if (delRequest.status == 200) {

                //Remove all data of the current user from locale storage
                localStorage.removeItem("user");
                localStorage.removeItem("potentials");
                localStorage.removeItem("matches");
                localStorage.setItem("loggedIn", "false");

                //Go to the log in page
                location.replace("frontPage.html");

            }

        }

    };

    //Listen for response to updated user
    updateUserRequest.onreadystatechange = () => {

        //Check for repsonse status of "OKAY"
        if(updateUserRequest.status == 200) {

            //Save response text and parse it to readable object
            var json = JSON.parse(updateUserRequest.responseText);

            //Update the displayed user information
            dispName.innerHTML = "Dit navn: " + json["user"].name;
            dispEmail.innerHTML = "Din email: " + json["user"].email;
            dispAge.innerHTML = "Din alder: " + json["user"].age;
            dispInterests.innerHTML = json["user"].userInterests;

            //Remove the typed new information again
            textField.value = "";

        }
        

    };

    //Listen for response to liked new user
    saveRequest.onreadystatechange = () => {

        //Check for response status of "OKAY"
        if (saveRequest.status == 200) {

            //Save the response text and parse to readable object
            const parsed = JSON.parse(saveRequest.responseText);
            
            //Load all new matches and save new matches for the current user
            const newMatches = parsed["allMatches"];
            const myNew = newMatches[myUser.email];
            myMatches = myNew;

            //Add one to index for which potential like is being shown
            potMatchIndex += 1;
        
            //If the index is not at the last place in the array of the potential likes show the next
            if (potMatchIndex < myPotentials.length-1) {
            
                getPotentialMatch(myPotentials[potMatchIndex]);
            
            } else {

                //There are no more potential likes
                //Show the dummy user
                potName.innerHTML = "Dummy User";
                potGender.innerHTML = "Du har desværre ikke flere potentielle matches";
                potAge.innerHTML = "";
                potInterests.innerHTML = "Interesser: " + "intet";
                potImage.src = "http://localhost:3000/" + "dummy@dummy.dk-.png";

                //Hide like and dislike button
                likeBut.style.display = "none";
                dislikeBut.style.display = "none";

            }

            //Remove existing matches in HTML page
            while(matchDiv.firstChild) {

                matchDiv.removeChild(matchDiv.lastChild);

            }

            //Add headline text again
            var newItem = document.createElement("h2");
            newItem.innerHTML = "Dine matches:";
            matchDiv.appendChild(newItem);

            //Iterate through the new matches and add the all to the HTML page
            for (i=0; i < myNew.length; i++) {

            var item = document.createElement("p");
            item.innerHTML = myNew[i].name + ", " + myNew[i].email + ", " + myNew[i].age;
            matchDiv.appendChild(item);

            }

            //Check if there was a new match after liking a user
            if(myNew.length > amountOfMatches) {

                //If yes alert the user that they have a new match!
                alert("Nyt match!");

            }

        }

    }

    //Declare function for updating the potential like-user that is currently being shown
    function getPotentialMatch(potMatch) {

        //Update the shown user with the userdata passed in parameter at the call of the function
        potName.innerHTML = "Navn: " + potMatch.name;
        potGender.innerHTML = "Køn: " + potMatch.gender;
        potAge.innerHTML = "Alder: " + potMatch.age;
        potInterests.innerHTML = "Interesser: " + potMatch.userInterests;
        potImage.src = "http://localhost:3000/" + potMatch.image.filename

    }

    });