// Get elements
const inputLang = document.querySelector(".input-lang");
const containerRep = document.querySelector(".container-repo");
const fetchBtn = document.querySelector(".fetch-btn");
const repoDescription = document.querySelector(".repo-desc");
const repoHeading = document.querySelector(".repo-heading");
const fork = document.querySelector(".fork");
const stars = document.querySelector(".stars");
const issues = document.querySelector(".issues");

const errorMessage = document.querySelector(".error-message");

const randomRepoFind = (data, random_repo) => {
  repoHeading.innerHTML = `${data.items[random_repo].full_name}`;
  repoHeading.setAttribute("href", data.items[random_repo].html_url);
  repoHeading.setAttribute("target", " _blank");
  repoDescription.innerHTML = `${data.items[random_repo].description}`;

  fork.innerHTML = `Fork: ${data.items[random_repo].forks_count}`;
  stars.innerHTML = `Score: ${data.items[random_repo].score}`;
  issues.innerHTML = `Issues: ${data.items[random_repo].open_issues_count}`;
};

const checkInput = (input) => {
  const checkInp = input.trim();
  if (!checkInp) {
    return false;
  }
  return true;
};

async function fetchRepo(language) {
  const API = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=100`;
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error(`HTTP error status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

fetchBtn.addEventListener("click", async (event) => {
  errorMessage.innerHTML = "";

  const input = inputLang.value;

  if (!checkInput(input)) {
    errorMessage.innerHTML = "Please enter a valid programming language";
    return;
  }

  fetchBtn.disabled = true;
  fetchBtn.innerHTML = "Loading...";

  try {
    const data = await fetchRepo(input);

    if (data.items.length === 0) {
      throw new Error("No repositories found for the given language");
    }

    const random_repo = Math.floor(Math.random() * data.items.length);
    randomRepoFind(data, random_repo);

    fetchBtn.disabled = false;
    fetchBtn.innerHTML = "Fetch Repository";
  } catch (error) {
    errorMessage.innerHTML = `Error fetching repositories: ${error.message}`;
    fetchBtn.disabled = false;
    fetchBtn.innerHTML = "Fetch Repository";
  }
});
