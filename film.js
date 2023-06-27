let nameH1;
let episodeSpan;
let releasedYearSpan;
let directorSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  episodeSpan = document.querySelector("span#episode");
  directorSpan = document.querySelector("span#director");
  releasedYearSpan = document.querySelector("span#releasedYear");
  charactersUl = document.querySelector("#characters>ul");
  planetsUl = document.querySelector("#planets>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  //   localStorage.setItem("films", "[]");
  let film = {};
  const films = JSON.parse(localStorage.getItem("films") || "[]");
  const foundLocalMatch = films.find((film) => film.id === +id);

  if (!foundLocalMatch) {
    try {
      film = await fetchFilm(id);
      films.push(film);
      localStorage.setItem("films", JSON.stringify(films));
    } catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
  } else {
    film = foundLocalMatch;
  }
  film.characters = await fetchCharacters(film);
  film.planets = await fetchPlanets(film);

  renderFilm(film);
}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.episode_id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

async function fetchPlanets(film) {
  const url = `${baseUrl}/films/${film?.episode_id}/planets`;
  const planets = await fetch(url).then((res) => res.json());
  return planets;
}

const renderFilm = (film) => {
  document.title = `SWAPI - ${film?.title}`; // Just to make the browser tab say their name
  nameH1.textContent = film?.title;
  releasedYearSpan.textContent = film?.release_date;
  directorSpan.textContent = film?.director;
  episodeSpan.textContent = film?.episode_id;
  const rosterLis = film?.characters?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  charactersUl.innerHTML = rosterLis.join("");
  const planetsLis = film?.planets?.map(
    (planet) => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`
  );
  planetsUl.innerHTML = planetsLis.join("");
};
