import {getWorks} from "../servises/api.js"

const galleryContainer = document.querySelector(".gallery");
// cmd + shift + L = recuperation de l'ensemble//
const works = await getWorks()
//tableau comprenant tt les infos img / alt / figcaption de la partie Mes Projets
displayWorks(works)
// autre methode : innerHTML
//document.querySelector(".gallery").innerHTML ='';

//  async function
// fetch("http://localhost:....")

/* récupération des données */
// Mes Projets
/* création de la div Gallery dans le dom */


function displayWorks(worksToDisplay) {
  galleryContainer.innerHTML = "";
  // boucle for pour afficher les images
  for (let i = 0; i < worksToDisplay.length; i++) {
    console.log(i);
    const figure = document.createElement("figure");
    galleryContainer.append(figure);

    const image = document.createElement("img"); //création de l'élément img
    figure.appendChild(image);
    console.log("image marche");
    image.src = worksToDisplay[i].imageUrl;
    image.alt = worksToDisplay[i].title;
    console.log("image OK");

    const title = document.createElement("figcaption"); // création de l'élément figcaption
    figure.appendChild(title);
    console.log("txt marche");
    title.innerText = worksToDisplay[i].title;
    console.log("txt ok");
  }
}

/* struture différente de la boucle, mais meme effets. essais de recuerer les données sans passer par un tableau
    for (let i = 0; i < tables.length; i++) {
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const altElement = document.createElement("alt");
        const tagLineElement = document.createElement("figcaption");
        imageElement.src = tables[i].imageUrl; 
        altElement.innerHTML = tables[i].alt;
        tagLineElement.innerText = tables[i].tagLine;
        galleryContainer.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        imageElement.appendChild(altElement);
        figureElement.appendChild(tagLineElement);
    }
*/
