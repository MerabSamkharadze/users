"use strict";
const ul = document.querySelector(".users_list");

fetch("https://reqres.in/api/users?page=", { method: "GET" })
  .then((responseData) => {
    if (!responseData.ok) {
      throw responseData.status;
    }
    return responseData.json();
  })
  .then((response) => {
    const data = response.data;
    console.log(data);
    data.forEach((element) => {
      const li = document.createElement("li");
      const nameP = document.createElement("p");
      nameP.textContent = `${element.first_name} ${element.last_name}`;
      console.log(nameP);
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
