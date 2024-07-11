import { getWorks, getCategories, deleteWork, addWork } from "../services/api.js";

const galleryContainer = document.querySelector(".gallery");
const categoriesContainer = document.querySelector(".filtres");

const allWorks = await getWorks();
const categories = await getCategories();

const edition = document.getElementById("edition");
const login = document.querySelector(".login");
const modification = document.getElementById("modification");
const dialog = document.querySelector(".modal-delete");
const closeModal = document.getElementById("closeModal");

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

const modalGallery = document.querySelector(".modalGallery");

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
        } catch (error) {
          alert("une erreur est survenue")
        }
      } 
    });
  }
};


