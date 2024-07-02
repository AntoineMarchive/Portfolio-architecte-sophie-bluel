import { getWorks, getCategories } from "../services/api.js";

const galleryContainer = document.querySelector(".gallery");
const categoriesContainer = document.querySelector(".filtres"); //fait pour l'essais de boucle categories

// cmd + shift + L = recuperation de l'ensemble//


const allWorks = await getWorks(); // declare ma variable = attendre de recuperer tt mes works
const categories = await getCategories();

//fonction (parametres);
displayWorks(allWorks); // appel ma fonction displayworks pour afficher TT les works"allworks en parametres"
displayCategories(categories);

// Mes Projets
// création des btn biltres dans le dom
// essais de boucle pour Categories

//function  action de la fct (parametres)
function displayCategories(categoriesToDisplay) {
  categoriesToDisplay.unshift({ // ajoute a la 1ere place du tableau
    id: 0,
    name: "Tous",
  });
  //verifier si le conteneur est déjà rempli
  if (categoriesContainer.children.length > 0) {
    return; // Si c'est le cas, ne faites rien
  }
  for (let i = 0; i < categoriesToDisplay.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("button");
    btn.innerText = categoriesToDisplay[i].name;

    if (i === 0) { // Ajouter la classe 'active' au premier bouton
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      if (categoriesToDisplay[i].id == 0) {
        displayWorks(allWorks);
      } else {
        const filteredWorks = allWorks.filter(work => work.categoryId === categoriesToDisplay[i].id);
        displayWorks(filteredWorks); // afficher les works filtrés
      }
      
       // Gérer la classe 'active'
       const activeButton = document.querySelector(".button.active");
       if (activeButton) {
         activeButton.classList.remove("active");
       }
       btn.classList.add("active");
    });

    categoriesContainer.appendChild(btn);
  }
}

/* création de la div Gallery dans le dom */
function displayWorks(worksToDisplay) {
  galleryContainer.innerHTML = ""; // remet a 0 pour recharger sinon accumulation (boucle)
  // boucle for pour afficher les images
  for (let i = 0; i < worksToDisplay.length; i++) { // worksToDisplay = nom de l'api en interne
    //Création d'une balise dédiée à un projet Gallery
    const figure = document.createElement("figure");
    galleryContainer.append(figure);

    const image = document.createElement("img"); //création de l'élément img
    figure.appendChild(image);
    //console.log("image marche");
    image.src = worksToDisplay[i].imageUrl;
    image.alt = worksToDisplay[i].title;
    //console.log("image OK");

    const title = document.createElement("figcaption"); // création de l'élément figcaption
    figure.appendChild(title);
    //console.log("txt marche");
    title.innerText = worksToDisplay[i].title;
    //console.log("txt ok");
  }
}
