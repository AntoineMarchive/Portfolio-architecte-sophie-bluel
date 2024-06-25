import { getWorks, getCategories } from "../services/api.js";

const galleryContainer = document.querySelector(".gallery");
const categoriesContainer = document.querySelector(".filtres"); //fait pour l'essais de boucle categories

// cmd + shift + L = recuperation de l'ensemble//

const allWorks = await getWorks(); // recuperer tt mes works
const categories = await getCategories();

displayWorks(allWorks); // appel ma fonction displayworks pour afficher TT les works"allworks en parametres"
displayCategories(categories);

// Mes Projets
// création des btn biltres dans le dom
// essais de boucle pour Categories
function displayCategories(categoriesToDisplay) {
  categoriesToDisplay.unshift({
    id: 0,
    name: "Tous",
  });
  //verifier si le conteneur est déjà rempli
  if (categoriesContainer.children.length > 0) {
    return; // Si c'est le cas, ne faites rien
  }
  for (let i = 0; i < categoriesToDisplay.length; i++) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.innerText = categoriesToDisplay[i].name;
    button.addEventListener("click", () => {
      if (categoriesToDisplay[i].id == 0) {
        displayWorks(allWorks);
      } else {
        displayWorks([])
      }
    });

    categoriesContainer.appendChild(button);
  }
}

/* création de la div Gallery dans le dom */
function displayWorks(worksToDisplay) {
  galleryContainer.innerHTML = "";
  // boucle for pour afficher les images
  for (let i = 0; i < worksToDisplay.length; i++) {
    //console.log(i);
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
