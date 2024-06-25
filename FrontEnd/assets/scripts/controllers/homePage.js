import { getWorks, getCategories} from "../services/api.js";

const galleryContainer = document.querySelector(".gallery");
const categoriesContainer = document.querySelector(".filtres"); //fait pour l'essais de boucle categories

// cmd + shift + L = recuperation de l'ensemble//

const works = await getWorks();
const categories = await getCategories();

displayWorks(works);
displayCategories(categories);

// Mes Projets
// création des btn biltres dans le dom
// essais de boucle pour Categories
function displayCategories(categoriesToDisplay) {
  //verifier si le conteneur est déjà rempli
  if (categoriesContainer.children.length > 0) {
    return; // Si c'est le cas, ne faites rien
}
    for (let i = 0; i < categoriesToDisplay.length; i++) {
      console.log(i);
      const button = document.createElement("div"); 
      categoriesContainer.appendChild(button);
      button.classList.add("button"); 
  
      const btnObjet = document.createElement("button");
      button.appendChild(btnObjet);
      btnObjet.innerText = categoriesToDisplay[i].name; // Création du texte 'Objets'
      console.log("bouton objet ok");
  
      const btnAppartements = document.createElement("button");
      button.appendChild(btnAppartements);
      btnAppartements.innerText = categoriesToDisplay[i].name; // Création du texte 'Appartements'
      console.log("bouton appartement ok");
  
      const btnHotel = document.createElement("button");
      button.appendChild(btnHotel);
      btnHotel.innerText = categoriesToDisplay[i].name; // Création du texte 'Hotels & Restaurants'
      console.log("bouton hotel ok");
  };
};

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
  };
};
