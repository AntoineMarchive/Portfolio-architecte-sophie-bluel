import { login } from "../services/api.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");
const errorText = document.getElementById("errortext");
 
 

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const valueEmail = email.value; // valeur de l'email a ce moment la 
    const valuePassword = password.value; // valeur du password a ce moment lat
    login(valueEmail, valuePassword)
    .then((response) => response.json()) // puis la reponse sera une reponse au format json.
    .then(login => { 
        if (login.token ) { // si il y a un token 
            localStorage.setItem("token", login.token); // la cle sera token, et la valeur sera login.token
            window.location.href="./index.html";
        } else {
            errorText.classList.remove("hidden");
        };
    });
});


