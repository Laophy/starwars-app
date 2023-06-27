const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    climateSpan = document.querySelector('span#climate');
    diameterSpan = document.querySelector('span#diameter');
    orbitalPeriodSpan = document.querySelector('span#orbital_period');
    populationSpan = document.querySelector('span#population');
    rotationPeriodSpan = document.querySelector('span#rotation_period');
    surfaceWaterSpan = document.querySelector('span#surface_water');
    terrainSpan = document.querySelector('span#terrain');

    // Grabs the id from the passed url link
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
});

async function getPlanet(id) {
    let planet;
    try {
        planet = await fetchHomeworld(id)
    }
    catch (ex) {
        console.error(`Error reading planet ${id} data.`, ex.message);
    }
    renderPlanet(planet);
}

async function fetchHomeworld(planetID) {
    const url = `${baseUrl}/planets/${planetID}`;
    const data = await fetch(url)
        .then(res => res.json())
    return data;
}

const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    climateSpan.textContent = planet?.climate;
    diameterSpan.textContent = planet?.diameter;
    orbitalPeriodSpan.textContent = planet?.orbital_period;
    populationSpan.textContent = planet?.population;
    rotationPeriodSpan.textContent = planet?.rotation_period;
    surfaceWaterSpan.textContent = planet?.surface_water;
    terrainSpan.textContent = planet?.terrain;
  }
  