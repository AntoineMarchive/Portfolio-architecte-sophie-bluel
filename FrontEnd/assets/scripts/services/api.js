export async function getWorks() {
   const responseWorks = await fetch("http://localhost:5678/api/works"); // interroger le serveur
   const works = await responseWorks.json(); // si reponse ok, on aura les données
   //console.log(works);
   return works; // renvois les works
};

export async function getCategories() {
    const responseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await responseCategories.json();
    //console.log(categories);
    return categories; // renvois les catégories
};

// export de la fonction pour email et password vers le serveur
export async function login(email, password) {
    return fetch("http://localhost:5678/api/users/login", {
        method: 'POST', // permet de creer une information
        body: JSON.stringify({ //transformation en chaine de caractere
            "email": email,
            "password": password,
        }),
        headers: {
            "Content-type": "application/json" // charge utile, parametre essentiel
        }
        
    });
};

export async function deleteWork(id) {
    const res = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!res.ok) {
        throw new Error('Failed to delete work');
    }
    return;
} ;

export async function addWork(workData) {
    const res = await fetch("http://localhost:5678/api/works", {
        method: 'POST',
        body: workData,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!res.ok) {
        throw new Error('Failed to add work');
    }

    const data = await res.json();
    return data;
};
