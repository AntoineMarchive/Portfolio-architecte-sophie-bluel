import { getConnection } from "../services/api.js";

const email = document.getElementById("email")
const password = document.getElementById("password")
const form = document.querySelector("form")
const errorText = document.getElementById("errortext")
 
 

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const valueEmail = email.value
    const valuePassword = password.value
    getConnection(valueEmail, valuePassword)
    .then((response) => response.json())
    .then(login => { 
        if (login.token) {
            localStorage.setItem("token", login.token)
            window.location.href="./index.html"
        } else {
            errorText.classList.remove("hidden")
        }
    }) 
    
});