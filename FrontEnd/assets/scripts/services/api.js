export async function getWorks() {
   const responseWorks = await fetch("http://localhost:5678/api/works"); // interroger le serveur
   const works = await response.json(); // si reponse ok, on aura les données
   return works; // renvois les works
};

export async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await reponse.json();
    return categories;
};