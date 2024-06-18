//récupération des données
// création de mes variables

const form = document.querySelector("form");


// ajout d'une ecouteur d'évènements du bouton envoyer
form.addEventListener("submit", (event) => {
    //on empeche le comportement par defaut
    event.preventDefault();
    console.log("il n'y a pas de rehargement de page");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
   if () {  // si mon email ou mot de passe est bon, alors je me connecte

   } else {  // sinon j'envois un message d'erreur

   }
});