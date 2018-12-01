const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");



const getUsers = async (user) => {
  const api_call = await fetch(`https://api.github.com/users/${user}`);

  const data = await api_call.json();
  return {data}
};

const showData =  () => {
  getUsers(inputValue.value).then((response) => {
  //  console.log(response);

    nameContainer.innerHTML =`Name: <span class="main__profile-value"> ${response.data.name} </span>`;
    unContainer.innerHTML =`Username: <span class="main__profile-value"> ${response.data.login} </span>`;
    reposContainer.innerHTML =`Repos: <span class="main__profile-value"> ${response.data.public_repos} </span>`;
    urlContainer.innerHTML =`URL: <span class="main__profile-value"> ${response.data.html_url} </span>`;
  })
};

searchButton.addEventListener("click", () => {
  showData();
})
