"use strict";
const ul = document.querySelector(".users_list");
const loadnext = document.getElementById("loadnext");
const loadprev = document.getElementById("loadprev");

let currentPage = 1;
let totalPages;
function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, { method: "GET" })
    .then((responseData) => {
      if (!responseData.ok) {
        throw responseData.status;
      }
      return responseData.json();
    })
    .then((response) => {
      const data = response.data;
      totalPages = response.total_pages;
      console.log(totalPages);
      data.forEach((element) => {
        const li = document.createElement("li");
        const nameP = document.createElement("p");
        nameP.textContent = `${element.first_name} ${element.last_name}`;
        const avatarImg = document.createElement("img");
        avatarImg.src = element.avatar;
        li.appendChild(avatarImg);
        li.append(nameP);
        ul.appendChild(li);
      });
    })
    .catch((error) => {
      let h1 = document.createElement("h1");
      h1.textContent = "Server problem 😣";
      document.body.appendChild(h1);
    });
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
