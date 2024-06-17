// cmd + shift + L = recuperation de l'ensemble//

//tableau comprenant tt les infos img / alt / figcaption de la partie Mes Projets
const tables = [ 
    {
        imgage: "assets/images/abajour-tahina.png",
        alt: "Abajour Tahina",
        tagLine: "Abajour Tahina" ,
    },
    {
        image: "assets/images/appartement-paris-v.png",
        alt: "Appartement Paris V",
        tagLine: "Appartement Paris V",
    },
    {
        image: "assets/images/restaurant-sushisen-londres.png",
        alt: "Restaurant Sushisen - Londres",
        tagLine: "Restaurant Sushisen - Londres",
    },
    {
        image: "assets/images/la-balisiere.png",
        alt: "Villa “La Balisiere” - Port Louis",
        tagLine: "Villa “La Balisiere” - Port Louis",
    },
    {
        image: "assets/images/structures-thermopolis.png",
        alt: "Structures Thermopolis",
        tagLine: "Structures Thermopolis",
    },
    {
        image: "assets/images/appartement-paris-x.png",
        alt: "Appartement Paris X",
        tagLine: "Appartement Paris X",
    },
    {
        image: "assets/images/le-coteau-cassis.png",
        alt: "Pavillon “Le coteau” - Cassis",
        tagLine: "Pavillon “Le coteau” - Cassis",
    },
    {
        image: "assets/images/villa-ferneze.png",
        alt: "Villa Ferneze - Isola d’Elba",
        tagLine: "Villa Ferneze - Isola d’Elba",
    },
    {
        image: "assets/images/appartement-paris-xviii.png",
        alt: "Appartement Paris XVIII",
        tagLine: "Appartement Paris XVIII",
    },
    {
        image: "assets/images/bar-lullaby-paris.png",
        alt: "Bar “Lullaby” - Paris",
        tagLine: "Bar “Lullaby” - Paris",
    },
    {
        image: "assets/images/hotel-first-arte-new-delhi.png",
        alt: "Hotel First Arte - New Delhi",
        tagLine: "Hotel First Arte - New Delhi",
    },
];


/* récupération des données */

// Mes Projets
/* création de la div Gallery dans le dom */
let galleryContainer = document.querySelector(".gallery");

// boucle for pour afficher les images
for (let i = 0; i <= tables.length - 1; i++) {
    console.log(i);
    const figure = document.createElement("figure");
    galleryContainer.append(figure); 

    const image = document.createElement("img");  //création de l'élément img
    figure.appendChild(image);
    console.log("image marche");
    image.src = tables[i].image;
    console.log("image OK");

    //const alt = document.createElement("alt");  //création de l'élément alt
    //figure.appendChild(alt);
    //alt.innerHTML = tables[i].alt;

    const tagLine = document.createElement("figcaption");  // création de l'élément figcaption
    figure.appendChild(tagLine);
    console.log("txt marche");
    tagLine.innerText = tables[i].tagLine;
    console.log("txt ok");
}

