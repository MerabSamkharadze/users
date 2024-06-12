"use strict";
const ul = document.querySelector(".users_list");
const loadnext = document.getElementById("loadnext");
const loadprev = document.getElementById("loadprev");

let currentPage = 1;
let totalPages;
function getUsers(page) {
  addLoader();
  fetch("https://reqres.in/api/users?page=" + page, { method: "GET" })
    .then((responseData) => {
      if (!responseData.ok) {
        throw responseData.status;
      }
      return responseData.json();
    })
    .then((response) => {
      const fragment = new DocumentFragment();
      const data = response.data;
      totalPages = response.total_pages;
      data.forEach((element) => {
        const li = document.createElement("li");
        const nameP = document.createElement("p");
        nameP.textContent = `${element.first_name} ${element.last_name}`;
        const avatarImg = document.createElement("img");
        avatarImg.src = element.avatar;
        li.appendChild(avatarImg);
        li.append(nameP);
        fragment.appendChild(li);
      });
      ul.appendChild(fragment);
    })
    .catch((error) => {
      let h1 = document.createElement("h1");
      h1.textContent = "Server problem 😣";
      document.body.appendChild(h1);
    })
    .finally(() => {
      hideLoader();
    });

  if (currentPage === 1) {
    loadprev.classList.add("disable");
    loadnext.classList.remove("disable");
  } else if ((currentPage = totalPages)) {
    loadnext.classList.add("disable");
    loadprev.classList.remove("disable");
  } else {
    loadnext.classList.remove("disable");
    loadprev.classList.remove("disable");
  }
}
getUsers(currentPage);
loadnext.addEventListener("click", () => {
  if (currentPage === totalPages) {
    return;
  }
  ul.innerHTML = "";
  currentPage++;
  getUsers(currentPage);
});

loadprev.addEventListener("click", () => {
  if (currentPage === 1) {
    return;
  }
  ul.innerHTML = "";
  currentPage--;
  getUsers(currentPage);
});

function hideLoader() {
  document.querySelector(".loader_box").style.display = "none";
}

function addLoader() {
  document.querySelector(".loader_box").style.display = "bloc";
}
