//récuperation des variables du tableau//
// cmd + shift + L = recuperation de l'ensemble//
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

/* Tables */

/* récupération des données */

/* création de la div Gallery dans le dom */
let galleryContainer = document.querySelector(".gallery");


for (let i = 0; i < tables.length; i++) {
    const figure = document.createElement("figure");
    galleryContainer.append(figure); 
    
    const image = document.createElement("img");
    figure.append(image);
    console.log("ça marche");
    image.src = tables[i].image;
    console.log("image OK");

    const tagLine = document.createElement("figcaption");
    figure.append(tagLine);
    console.log("txt marche");
    tagLine.innerText = tables[i].tagLine;
    console.log("txt ok");
}

