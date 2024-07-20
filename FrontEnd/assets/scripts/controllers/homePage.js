import { getWorks, getCategories, deleteWork, addWork } from "../services/api.js";

const galleryContainer = document.querySelector(".gallery");
const categoriesContainer = document.querySelector(".filtres");

const allWorks = await getWorks();
const categories = await getCategories();

const edition = document.getElementById("edition");
const login = document.querySelector(".login");
const modalGallery = document.querySelector(".modalGallery");
const modification = document.getElementById("modification");
const dialog = document.querySelector(".modal-delete");
const closeModal = document.getElementById("closeModal");
const changeModal = document.getElementById("changeModal");
const modalContent1 = document.querySelector(".modal-content");
const modalContent2 = document.querySelector(".modal-content2");
const returnModal = document.getElementById("returnModal");
const closeModal2 = document.getElementById("closeModal2");
const ajouterImage = document.getElementById("ajouterImage");
const previewImageContainer = document.getElementById("previewImageContainer");
const addPhotoForm = document.getElementById("ajoutProjet"); // Ajout de la référence au formulaire



const token = localStorage.getItem("token");
if (token) {
    edition.classList.remove("hidden");
    modification.classList.remove("hidden");
    categoriesContainer.classList.add("hidden");
    login.href = "/";
    login.innerText = "logout";
    login.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.reload();
    });
};

displayWorks(allWorks);
displayCategories(categories);


function displayCategories(categoriesToDisplay) {
    categoriesToDisplay.unshift({
        id: 0,
        name: "Tous",
    });

    if (categoriesContainer.children.length > 0) {
        return;
    }

    for (let i = 0; i < categoriesToDisplay.length; i++) {
        const btn = document.createElement("button");
        btn.classList.add("button");
        btn.innerText = categoriesToDisplay[i].name;

        if (i === 0) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            if (categoriesToDisplay[i].id == 0) {
                displayWorks(allWorks);
            } else {
                const filteredWorks = allWorks.filter(work => work.categoryId === categoriesToDisplay[i].id);
                displayWorks(filteredWorks);
            }

            const activeButton = document.querySelector(".button.active");
            if (activeButton) {
                activeButton.classList.remove("active");
            }
            btn.classList.add("active");
        });

        categoriesContainer.appendChild(btn);
    }
}

function displayWorks(worksToDisplay) {
    galleryContainer.innerHTML = "";
    for (let i = 0; i < worksToDisplay.length; i++) {
        const figure = document.createElement("figure");
        figure.id = "workGallery" +worksToDisplay[i].id;
        galleryContainer.append(figure);
        
        const image = document.createElement("img");
        figure.appendChild(image);
        image.src = worksToDisplay[i].imageUrl;
        image.alt = worksToDisplay[i].title;

        const title = document.createElement("figcaption");
        figure.appendChild(title);
        title.innerText = worksToDisplay[i].title;
    }
};


modification.addEventListener("click", (e) => {
  modalGalleryDisplay(allWorks);
  dialog.showModal();
});

closeModal.addEventListener("click", (e) => {
  dialog.close();
});

// Modal //
function modalGalleryDisplay(worksToDisplay) {
  modalGallery.innerHTML = "";
  for (let i = 0; i < worksToDisplay.length; i++) {
    const modalGalleryContent = document.createElement("div");
    modalGalleryContent.classList.add("modal-gallery-content")
    modalGallery.appendChild(modalGalleryContent);
    const image = document.createElement("img");
    modalGalleryContent.appendChild(image);
    image.src = worksToDisplay[i].imageUrl;
    image.alt = worksToDisplay[i].title;
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash-can");
    modalGalleryContent.appendChild(icon);
    icon.addEventListener("click", async (event) => {
      if (confirm("voulez-vous supprimer cette photo")) {
        try {
          modalGalleryContent.remove();
          const workGallery = document.getElementById("workGallery" +worksToDisplay[i].id);
          workGallery.remove();
          await deleteWork(worksToDisplay[i].id);
          allWorks.splice(i, 1); // commit
        } catch (error) {
          alert("une erreur est survenue")
        }
      } 
    });
  };
};


//permet de passer de la modale 1 a 2 et inversement 
function switchModal() {
  if (modalContent1.classList.contains("hidden")) {
    modalContent2.classList.add("hidden");
    modalContent1.classList.remove("hidden");
  } else {
    modalContent1.classList.add("hidden");
    modalContent2.classList.remove("hidden");
  };
};

changeModal.addEventListener("click", (event) =>{
  switchModal();
  dialog.showModal();
});

returnModal.addEventListener("click", (event) => {
  switchModal();
});

closeModal2.addEventListener("click", (event) => {
  switchModal();
  dialog.close();
});

closeModal.addEventListener("click", (event) => {
  dialog.close();
});

//click en dehors de la modal
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close(); 
  }
});

// Fonction pour afficher l'aperçu de l'image
ajouterImage.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file.type !== "image/png" && file.type !== "image/jpeg") {
    alert("Veuillez selectionner un fichier image de type JPG ou PNG.");
    event.target.value = "";
  }
   // Vérifier la taille du fichier (4 Mo max)
   if (file.size > 4 * 1024 * 1024) {
    alert("La taille du fichier dépasse la limite de 4 Mo.");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImageContainer.innerHTML = `<img src="${e.target.result}" alt="Preview Image" class="preview-image">`;
    previewImageContainer.classList.remove("hidden");
    const ajoutPhotoContainer = document.getElementById("ajoutPhotoContainer");
    ajoutPhotoContainer.classList.add("hidden");
  };
  reader.readAsDataURL(file);

});

// Fonction pour soumettre le formulaire
addPhotoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  console.log(formData.get("image"))
  console.log(formData.get("title"))
  console.log(formData.get("category"))
  try {
    const newWork = await addWork(formData);
    allWorks.push(newWork);
    displayWorks(allWorks);
    modalGalleryDisplay(allWorks);
    // retirer l'image, vider (image source vide), refaire afficher la div "ajouter photocontainer"
    switchModal(); // Retourner à la modal principale après l'ajout
  } catch (error) {
    alert("Une erreur est survenue lors de l'ajout de la photo.");
  }
});

// Fonction pour obtenir et afficher les catégories dans le formulaire
async function populateCategories() {
  const categories = await getCategories();
  const categorieSelect = document.getElementById("categorie");
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id;
    option.innerText = category.name;
    categorieSelect.appendChild(option);
    // recuperer l'id 0 , pour avoir un champ vide //
  });
};

// Appel de la fonction pour remplir les catégories au chargement de la page
populateCategories();