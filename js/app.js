const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");
const reposListContainer = document.querySelector(".main__profile-repolist");
const languageContainer = document.querySelector(".large-7 medium-7 small-12 columns");



const getUsers = async (user) => {
  const api_call = await fetch(`https://api.github.com/users/${user}`);

  const data = await api_call.json();
  return {data}
};

const getRepos = async (user) => {
  const api_call = await fetch(`https://api.github.com/users/${user}/repos`);

  const repos = await api_call.json();
  return {data : repos}
};


const showData =  () => {
  getUsers(inputValue.value).then((response) => {
   //console.log(response);

    nameContainer.innerHTML =`Name: <span class="main__profile-value"> ${response.data.name} </span>`;
    unContainer.innerHTML =`Username: <span class="main__profile-value"> ${response.data.login} </span>`;
    reposContainer.innerHTML =`Repos: <span class="main__profile-value"> ${response.data.public_repos} </span>`;
    urlContainer.innerHTML =`URL: <span class="main__profile-value"> ${response.data.html_url} </span>`;
  })
};

const showRepos = () => {
    getRepos(inputValue.value).then((repos) => {
      //console.log(repos);
      while( reposListContainer.firstChild ){
        reposListContainer.removeChild( reposListContainer.firstChild );
      }
        for (var i = 0; i < repos.data.length; i++) {

              reposListContainer.innerHTML +=`<li class="list-group-item"> ${repos.data[i].name} </li>`;
        }
			});
			}





searchButton.addEventListener("click", () => {

  showData();
  showRepos();



})
