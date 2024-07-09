import { getWorks, getCategories } from "../services/api.js";

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
        galleryContainer.append(figure);

        const image = document.createElement("img");
        figure.appendChild(image);
        image.src = worksToDisplay[i].imageUrl;
        image.alt = worksToDisplay[i].title;

        const title = document.createElement("figcaption");
        figure.appendChild(title);
        title.innerText = worksToDisplay[i].title;
    }
}


modification.addEventListener("click", (e) => {
  modalGalleryDisplay(allWorks);
  dialog.showModal();
});

closeModal.addEventListener("click", (e) => {
  dialog.close();
});

function modalGalleryDisplay(worksToDisplay) {
  const modalGallery = document.querySelector(".modalGallery");
  galleryContainer.innerHTML = "";
  for (let i = 0; i < worksToDisplay.length; i++) {
    const image = document.createElement("img");
    modalGallery.appendChild(image);
    image.src = worksToDisplay[i].imageUrl;
    image.alt = worksToDisplay[i].title;
    //creer un btn
    //appeler btn enfant d'image
  }
};